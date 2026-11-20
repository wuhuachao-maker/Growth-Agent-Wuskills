#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gfa-gzh-format 渲染器 v1.3.0
把「带轻量标记的纯文本」确定性地渲染成微信公众号友好的行内样式 HTML，
附一键复制条 + 标注预览面板（在正文区外，不进剪贴板）。
脚本不做任何语义判断、不自动选色——主题由 --theme 显式指定（默认 red）。

v1.1.0：加粗字色 = 主题色（默认正红），不再是黑字。
v1.2.0：（语义判断规则上移到 SKILL.md，脚本不变）
v1.3.0：① --source 原文快照闭环校验——校验器拿 HTML 比"用户原文快照"，
           不再比"Agent 自己产出的标记文本"，堵住打标记阶段改字的漏洞；
        ② 标注预览面板放在正文 div 外 + user-select:none，一键复制/手动全选都不带走。

支持的标记（由上层 Agent 语义判断后标注，脚本只识别不判断）：
  ## 标题        -> 二级标题（主题色 + 左侧竖线）
  **加粗**       -> 行内加粗（主题色）
  > 引用         -> 引用块（左侧色条 + 浅底）
  （普通行）      -> 正文段落
  空行            -> 段落分隔（不产生空段落）

用法：
  python3 render.py input.txt -o out.html [--theme red] [--title "..."] [--source 原文.txt]
  python3 render.py --list-themes
  python3 render.py input.txt --check
  python3 render.py input.txt --verify out.html [--source 原文.txt]
  python3 render.py input.txt --body-only
"""
import sys
import re
import os
import argparse

# 主题表：颜色是可选清单，脚本永不自行判断用哪个；调用方（Agent/用户）决定
THEMES = {
    "red":      {"name": "正红（默认）", "accent": "#c0392b", "tint": "#fdf2f0"},
    "wine":     {"name": "酒红",         "accent": "#8e2b3c", "tint": "#faf1f3"},
    "vermilion":{"name": "朱红",         "accent": "#d94f28", "tint": "#fdf3ef"},
    "ink":      {"name": "墨黑",         "accent": "#2c2c2a", "tint": "#f5f5f3"},
    "blue":     {"name": "商务蓝",       "accent": "#185fa5", "tint": "#f2f7fd"},
    "orange":   {"name": "暖橙",         "accent": "#d85a30", "tint": "#fdf4ef"},
    "green":    {"name": "经典绿",       "accent": "#1aad19", "tint": "#f6fdf8"},
    "gray":     {"name": "浅灰极简",     "accent": "#5f5e5a", "tint": "#f7f7f6"},
}
DEFAULT_THEME = "red"


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def unesc(s):
    return s.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")


def norm(s):
    return re.sub(r"\s", "", s)


def inline(s, strong_style):
    """仅处理行内加粗标记 **x**；先转义防止注入，再做加粗。加粗用主题色。"""
    s = esc(s)
    s = re.sub(r"\*\*(.+?)\*\*", r'<strong style="%s">\1</strong>' % strong_style, s)
    return s


def strip_marks(s):
    """去掉标记，还原成纯文字。必须开 re.M，否则整段只有首行标记被去掉。"""
    s = re.sub(r"^##\s+", "", s, flags=re.M)
    s = re.sub(r"^>\s?", "", s, flags=re.M)
    return s.replace("**", "")


def build_styles(theme):
    t = THEMES.get(theme, THEMES[DEFAULT_THEME])
    a, tint = t["accent"], t["tint"]
    return {
        "h2": ("font-size:18px;font-weight:bold;color:%s;line-height:1.6;"
               "border-left:4px solid %s;padding:0 0 0 12px;margin:34px 0 16px;"
               "letter-spacing:0.5px;" % (a, a)),
        "p": ("font-size:16px;line-height:1.9;letter-spacing:0.5px;color:#333;"
              "margin:0 0 20px;text-align:justify;word-break:break-word;"),
        "quote": ("border-left:4px solid %s;background:%s;padding:12px 16px;"
                  "color:#555;margin:0 0 20px;line-height:1.85;font-size:16px;"
                  "letter-spacing:0.5px;" % (a, tint)),
        "strong": "color:%s;" % a,   # 加粗 = 主题色（默认正红）
    }


def convert(text, theme):
    S = build_styles(theme)
    out = []
    for raw in text.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            continue
        if re.match(r"^##\s+", line):
            content = re.sub(r"^##\s+", "", line)
            out.append('<h2 style="%s">%s</h2>' % (S["h2"], inline(content, S["strong"])))
        elif re.match(r"^>\s?", line):
            content = re.sub(r"^>\s?", "", line)
            out.append('<section style="%s">%s</section>' % (S["quote"], inline(content, S["strong"])))
        else:
            out.append('<p style="%s">%s</p>' % (S["p"], inline(line, S["strong"])))
    return "\n".join(out)


def extract_annotations(text):
    """从标记文本抽标注清单，供用户过目。纯读取，不进正文。"""
    heads, bolds, quotes = [], [], []
    for raw in text.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            continue
        if re.match(r"^##\s+", line):
            heads.append(re.sub(r"^##\s+", "", line))
        elif re.match(r"^>\s?", line):
            quotes.append(re.sub(r"^>\s?", "", line))
        else:
            bolds.extend(re.findall(r"\*\*(.+?)\*\*", line))
    return heads, bolds, quotes


def build_annotation_panel(text):
    """标注预览面板：正文 div 之外 + user-select:none，按钮复制与手动全选都带不走。"""
    heads, bolds, quotes = extract_annotations(text)

    def fmt(items, limit=40):
        if not items:
            return "（无）"
        shown = "；".join(esc(x) for x in items[:12])
        more = " …等 %d 处" % len(items) if len(items) > 12 else ""
        return shown + more

    parts = [
        '<div style="font-weight:bold;color:#666;margin-bottom:10px;">'
        '标注预览 · 仅查看，复制正文时不会带上</div>',
        '<div style="margin-bottom:6px;"><span style="color:#666;font-weight:600;">二级标题（%d）</span>：%s</div>'
        % (len(heads), fmt(heads)),
        '<div style="margin-bottom:6px;"><span style="color:#666;font-weight:600;">加粗（%d）</span>：%s</div>'
        % (len(bolds), fmt(bolds)),
        '<div><span style="color:#666;font-weight:600;">引用（%d）</span>：%s</div>'
        % (len(quotes), fmt(quotes)),
    ]
    inner = "\n".join(parts)
    return """<style>
#gzh-annot,#gzh-annot *{-webkit-user-select:none;user-select:none;}
</style>
<div id="gzh-annot" style="max-width:560px;margin:0 auto 44px;background:#fff;border:1px dashed #d5d5d5;border-radius:6px;padding:16px 20px;color:#999;font-size:12px;line-height:1.8;user-select:none;-webkit-user-select:none;">
%s
</div>""" % inner


def check(text):
    """排版体检：只报告结构，不改文字、不改结构。"""
    lines = [l.rstrip() for l in text.split("\n") if l.strip()]
    heads = sum(1 for l in lines if re.match(r"^##\s+", l))
    quotes = sum(1 for l in lines if re.match(r"^>\s?", l))
    bolds = len(re.findall(r"\*\*.+?\*\*", text))
    plain = strip_marks(text)
    cn = len(re.findall(r"[\u4e00-\u9fa5]", plain))
    total = len(re.sub(r"\s", "", plain))
    longest = max((len(strip_marks(l)) for l in lines), default=0)
    paras = len(lines) - heads - quotes
    print("=== 排版体检 ===")
    print("总字符数：%d   中文字数：%d" % (total, cn))
    print("段落数：%d   二级标题：%d   引用块：%d   加粗处：%d" % (paras, heads, quotes, bolds))
    print("最长段落：%d 字   预计阅读：%d 分钟" % (longest, max(1, round(total / 300))))
    tips = []
    if heads == 0 and total > 600:
        tips.append("全文无二级标题——长文建议先理解文章再标 3-8 个小标题（语义判断，不自动）")
    if longest > 150:
        tips.append("有段落超 150 字，手机阅读偏累；但拆段属于改结构，本 skill 不改，仅提示")
    if not tips:
        tips.append("结构良好")
    for t in tips:
        print("提示：", t)


def wrap_with_toolbar(body, title, annotation=""):
    """正文全行内样式；复制条和标注面板都在正文 div 外，不进入剪贴板。"""
    return """<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s</title></head>
<body style="margin:0;background:#eceff3;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;">
<div style="position:sticky;top:0;z-index:9;background:#fff;border-bottom:1px solid #e8e8e6;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:14px;">
  <div style="font-size:13px;color:#555;">公众号排版 · 一键复制 · 点右侧按钮后到公众号后台粘贴</div>
  <button id="cpb" onclick="cp()" style="background:#333;color:#fff;border:none;border-radius:5px;padding:9px 20px;font-size:13px;cursor:pointer;white-space:nowrap;">复制正文</button>
</div>
<div style="max-width:560px;margin:22px auto 18px;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,.06);border-radius:6px;">
  <div id="gzh-art" style="padding:30px 24px 42px;">
%s
  </div>
</div>
%s
<script>
function cp(){
  var b=document.getElementById('gzh-art');
  var r=document.createRange();r.selectNodeContents(b);
  var s=window.getSelection();s.removeAllRanges();s.addRange(r);
  try{document.execCommand('copy');var t=document.getElementById('cpb');t.textContent='已复制 ✓';setTimeout(function(){t.textContent='复制正文';},2200);}
  catch(e){alert('复制失败，请手动框选正文复制');}
  s.removeAllRanges();
}
</script>
</body></html>""" % (esc(title), body, annotation)


def extract_art(html):
    """从 HTML 抽正文区（gzh-art）文字；标注面板在它外面，不会被抽到。"""
    m = re.search(r'<div id="gzh-art"[^>]*>(.*?)</div>', html, re.S)
    frag = m.group(1) if m else html  # body-only 模式
    return unesc(re.sub(r"<[^>]+>", "", frag))


def verify(html, expect_text, label):
    """闭环校验：HTML 正文 vs 期望文字（原文快照 或 标记文本）。"""
    got, expect = norm(extract_art(html)), norm(expect_text)
    if got != expect:
        print("VERIFY FAIL（对比基准：%s）" % label, file=sys.stderr)
        # 找首个差异点，方便定位
        for i, (a, b) in enumerate(zip(expect, got)):
            if a != b:
                print("首个差异 @%d  期望:%s  实得:%s" % (
                    i, repr(expect[max(0, i-20):i+40]), repr(got[max(0, i-20):i+40])), file=sys.stderr)
                break
        else:
            print("长度不同  期望:%d  实得:%d" % (len(expect), len(got)), file=sys.stderr)
        return False
    return True


def main():
    ap = argparse.ArgumentParser(description="gfa-gzh-format 渲染器 v1.3.0")
    ap.add_argument("input", nargs="?", help="带标记的纯文本 .txt/.md")
    ap.add_argument("-o", "--output", help="输出 HTML 文件")
    ap.add_argument("--theme", default=DEFAULT_THEME, help="主题色：" + "/".join(THEMES) + "（默认 red）")
    ap.add_argument("--title", default="公众号图文", help="HTML 页面标题（不进入正文）")
    ap.add_argument("--source", help="用户原文快照 .txt（不可变）；提供则渲染前后逐字校验")
    ap.add_argument("--list-themes", action="store_true", help="列出可选主题")
    ap.add_argument("--check", action="store_true", help="只体检，不渲染")
    ap.add_argument("--verify", metavar="HTML", help="校验指定 HTML 的正文文字")
    ap.add_argument("--body-only", action="store_true", help="仅输出正文片段（不含工具条与标注面板）")
    args = ap.parse_args()

    if args.list_themes:
        for k, v in THEMES.items():
            print("%-11s %s%s" % (k, v["name"], " <- 默认" if k == DEFAULT_THEME else ""))
        return

    if not args.input:
        print("ERROR: 缺少输入文件；用 --list-themes 查看主题。", file=sys.stderr)
        sys.exit(2)
    if args.theme not in THEMES:
        print("未知主题：%s；可用：%s" % (args.theme, "/".join(THEMES)), file=sys.stderr)
        sys.exit(2)

    text = open(args.input, "r", encoding="utf-8").read()

    if args.check:
        check(text)
        return

    if args.verify:
        html = open(args.verify, "r", encoding="utf-8").read()
        if args.source:
            source = open(args.source, "r", encoding="utf-8").read()
            ok = verify(html, source, "用户原文快照")
        else:
            ok = verify(html, strip_marks(text), "标记文本（注意：非原文快照，防不住打标记改字）")
            if ok:
                print("WARN: 未传 --source，本次只证明渲染没丢字，不能证明打标记阶段没改字。")
        print("VERIFY OK：正文文字与基准逐字一致" if ok else "VERIFY FAILED")
        sys.exit(0 if ok else 1)

    # 渲染前闸门：标记文本去标记后必须 == 用户原文快照
    if args.source:
        source = open(args.source, "r", encoding="utf-8").read()
        if norm(strip_marks(text)) != norm(source):
            print("ERROR: 标记文本去标记后 ≠ 原文快照——打标记阶段改动了文字，拒绝渲染。", file=sys.stderr)
            for i, (a, b) in enumerate(zip(norm(source), norm(strip_marks(text)))):
                if a != b:
                    print("首个差异 @%d  原文:%s  标记后:%s" % (
                        i, repr(norm(source)[max(0, i-20):i+40]),
                        repr(norm(strip_marks(text))[max(0, i-20):i+40])), file=sys.stderr)
                    break
            sys.exit(1)

    body = convert(text, args.theme)
    annotation = "" if args.body_only else build_annotation_panel(text)
    html = body if args.body_only else wrap_with_toolbar(body, args.title, annotation)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(html)
        print("已写出:", args.output)
    else:
        print(html)


if __name__ == "__main__":
    main()
