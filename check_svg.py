with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('<svg id="logoSVG"')
if start != -1:
    end = text.find('</svg>', start)
    svg_block = text[start:end+6]
    print('Size of svg inside index.html:', len(svg_block))
    print(svg_block[:200])
else:
    print('No logoSVG found')
