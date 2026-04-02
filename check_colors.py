import re

def extract_colors(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    fills = set(re.findall(r'fill=\"([^\"]+)\"', text))
    styles = set(re.findall(r'style=\"([^\"]+)\"', text))
    css_fills = set()
    for style in styles:
        m = re.search(r'fill:\s*([^;]+)', style)
        if m:
            css_fills.add(m.group(1).strip())
    
    classes = set(re.findall(r'class=\"([^\"]+)\"', text))
    print(f"--- {file_path} ---")
    print("Fill attributes:", fills)
    print("CSS fills in style attributes:", css_fills)
    print("Classes found:", classes)

extract_colors('assets/images/logo.svg')
extract_colors('assets/images/logo-original.svg')
extract_colors('assets/images/logo_animated.svg')
