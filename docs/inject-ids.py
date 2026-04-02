import re

file_path = 'c:/Users/ASUS/Downloads/PROYECTOS SG/Porpuesta/Porpuesta/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

def replace_or_add_id(pattern, id_name, html):
    # This tries to match `<span class="some-class">Text` and inject id
    match = re.search(pattern, html)
    if match:
        original = match.group(0)
        tag_match = re.search(r'<([a-zA-Z0-9\-]+)([^>]*)>', original)
        if tag_match:
            tag = tag_match.group(1)
            attrs = tag_match.group(2)
            if f'id="{id_name}"' not in attrs:
                new_tag = f'<{tag} id="{id_name}"{attrs}>'
                new_original = original.replace(tag_match.group(0), new_tag)
                html = html.replace(original, new_original)
    return html

# Hero Section
html = replace_or_add_id(r'<span>SISTEMA DE ALTO RENDIMIENTO</span>', 'hero-badge', html)
html = replace_or_add_id(r'<span class="title-line">[\s\S]*?</span>', 'hero-title1', html)
html = replace_or_add_id(r'<span class="title-highlight">[\s\S]*?</span>', 'hero-title2', html)
html = replace_or_add_id(r'<p class="hero-subtitle">[\s\S]*?</p>', 'hero-subtitle', html)
html = replace_or_add_id(r'<p class="hero-description">[\s\S]*?</p>', 'hero-desc', html)
html = replace_or_add_id(r'<a href="#simulacros" class="hero-cta-primary">[\s\S]*?</a>', 'hero-cta1', html)
html = replace_or_add_id(r'<a href="#dashboard-showcase" class="hero-cta-secondary[^>]*>[\s\S]*?</a>', 'hero-cta2', html)
html = replace_or_add_id(r'<div class="hero-stats-desktop">', 'hero-stats', html) # Container for stats

# About Section
html = replace_or_add_id(r'<span class="section-badge">[\s\S]*?<span>QUIÉNES SOMOS</span>[\s\S]*?</span>', 'about-badge', html)
html = replace_or_add_id(r'<h2 class="section-title">¿Qué es Seamos Genios\?</h2>', 'about-title', html)
html = replace_or_add_id(r'<p class="section-subtitle">[\s\S]*?La fusión entre <span class="text-highlight">Tecnología</span> y <span class="text-highlight">Neurociencia</span>', 'about-subtitle', html)
html = replace_or_add_id(r'<div class="about-description">[\s\S]*?</p>.*?</div>', 'about-desc', html)
html = replace_or_add_id(r'<div class="about-methods">', 'about-methods', html)

# Tutors Section
html = replace_or_add_id(r'<span class="section-badge"[^>]*>[\s\S]*?<span>NUESTRO EQUIPO</span>[\s\S]*?</span>', 'tutores-badge', html)
html = replace_or_add_id(r'<h2 class="section-title"[^>]*>Aprende de los Mejores</h2>', 'tutores-title', html)
html = replace_or_add_id(r'<div class="tutors-grid">', 'tutores-list', html)

# Plans Section
html = replace_or_add_id(r'<span class="section-badge"[^>]*>[\s\S]*?<span>PLANES Y PRECIOS</span>[\s\S]*?</span>', 'planes-badge', html)
html = replace_or_add_id(r'<h2 class="section-title"[^>]*>Elige tu Plan</h2>', 'planes-title', html)
html = replace_or_add_id(r'<div class="pricing-amount">[\s\S]*?</div>', 'planes-price', html)
html = replace_or_add_id(r'<div class="pricing-guarantee">[\s\S]*?</div>', 'planes-guarantee', html)
html = replace_or_add_id(r'<ul class="pricing-features">', 'planes-benefits', html)
html = replace_or_add_id(r'<a href="#" class="pricing-cta">[\s\S]*?</a>', 'planes-cta', html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Injected IDs into index.html")
