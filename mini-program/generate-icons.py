# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw
import os

base = r"C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询\mini-program\pages"
os.makedirs(base, exist_ok=True)

SIZE = 81

def create_icon(out_path, draw_fn, active=False):
    img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw_fn(draw, active)
    img.save(out_path, 'PNG')
    print(f"OK: {out_path}")

# ========== 首页 icon ==========
def draw_home(draw, active):
    bg = (30, 58, 95) if active else (240, 240, 240)
    fg = (255, 255, 255) if active else (30, 58, 95)
    # house shape
    cx = SIZE // 2
    # roof triangle
    draw.polygon([(cx, 16), (20, 40), (61, 40)], fill=fg)
    # body rect
    draw.rectangle([(25, 38), (56, 60)], fill=fg)
    # door
    draw.rectangle([(35, 46), (46, 60)], fill=bg)

# ========== 赛事新闻 icon ==========
def draw_news(draw, active):
    bg = (30, 58, 95) if active else (240, 240, 240)
    fg = (255, 255, 255) if active else (30, 58, 95)
    # newspaper rect
    draw.rounded_rectangle([(18, 20), (63, 61)], radius=4, fill=fg)
    # fold corner
    draw.polygon([(57, 20), (63, 20), (63, 26)], fill=bg)
    # text lines
    for i in range(4):
        lw = 32 if i % 2 == 0 else 28
        draw.rectangle([(22, 27 + i*8), (22 + lw, 29 + i*8)], fill=bg)

# ========== 咨询 icon ==========
def draw_chat(draw, active):
    bg = (30, 58, 95) if active else (240, 240, 240)
    fg = (255, 255, 255) if active else (30, 58, 95)
    # chat bubble
    draw.rounded_rectangle([(14, 18), (67, 58)], radius=10, fill=fg)
    # bubble tail
    draw.polygon([(22, 58), (14, 68), (36, 58)], fill=fg)
    # dots
    for i, x in enumerate([30, 40, 50]):
        draw.ellipse([(x-3, 34), (x+3, 40)], fill=bg)

# ========== 我的 icon ==========
def draw_profile(draw, active):
    bg = (30, 58, 95) if active else (240, 240, 240)
    fg = (255, 255, 255) if active else (30, 58, 95)
    # circle head
    draw.ellipse([(30, 18), (51, 39)], fill=fg)
    # body arc
    draw.ellipse([(20, 46), (61, 67)], fill=fg)

# Generate all icons
tabs = [
    ('index', draw_home),
    ('news', draw_news),
    ('chat', draw_chat),
    ('profile', draw_profile),
]

for tab_name, draw_fn in tabs:
    dir_path = os.path.join(base, tab_name)
    os.makedirs(dir_path, exist_ok=True)
    create_icon(os.path.join(dir_path, f'{tab_name}.png'), draw_fn, active=False)
    create_icon(os.path.join(dir_path, f'{tab_name}-active.png'), draw_fn, active=True)

print("\nAll icons created!")
