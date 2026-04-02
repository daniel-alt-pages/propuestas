import re
import os

html_path = 'c:/Users/ASUS/Downloads/PROYECTOS SG/Porpuesta/Porpuesta/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract inline <style>
styles = re.findall(r'<style>(.*?)</style>', content, re.DOTALL)
if styles:
    with open('c:/Users/ASUS/Downloads/PROYECTOS SG/Porpuesta/Porpuesta/css/splash_inline.css', 'w', encoding='utf-8') as f:
        f.write("\n".join(styles))
    content = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="css/splash_inline.css">', content, count=1, flags=re.DOTALL)

# Extract inline <script>
scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
if scripts:
    splash_idx = 0
    tiktok_idx = 1 if len(scripts) > 1 else -1

    with open('c:/Users/ASUS/Downloads/PROYECTOS SG/Porpuesta/Porpuesta/js/splash.js', 'w', encoding='utf-8') as f:
        f.write(scripts[splash_idx])
    
    content = content.replace("<script>" + scripts[splash_idx] + "</script>", '<script src="js/splash.js"></script>', 1)
    
    if tiktok_idx != -1:
        with open('c:/Users/ASUS/Downloads/PROYECTOS SG/Porpuesta/Porpuesta/js/tiktok.js', 'w', encoding='utf-8') as f:
            f.write(scripts[tiktok_idx])
        content = content.replace("<script>" + scripts[tiktok_idx] + "</script>", '<script src="js/tiktok.js"></script>', 1)

# Add module loader for main.js and firebase
if 'js/firebase-config.js' not in content:
    content = content.replace('<script src="js/script.js"></script>', '<script src="js/script.js"></script>\n    <script type="module" src="js/firebase-config.js"></script>\n    <script type="module" src="js/main.js"></script>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactored HTML.")
