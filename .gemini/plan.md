# Plan de Implementación — Diseño Profesional y Mejoras Finales

## Estado Actual (ya completado)
- ✅ CSS mobile-first para simulacros (scroll snap horizontal, tamaños compactos)
- ✅ CSS para section dividers (`.section-divider`, `.section-spacer`)
- ✅ CSS para scroll reveal animations (`.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`)
- ✅ CSS para plan features toggle (`.plan-features-toggle`, `.features-toggle-btn`)
- ✅ HTML: Toggles añadidos a los 3 plan cards
- ✅ HTML: Section dividers añadidos entre secciones principales
- ✅ HTML: Tabla de comparación rediseñada con copy "IA de última generación"
- ✅ HTML: Clases reveal añadidas a elementos clave
- ✅ Precio Calendario A = $300,000 (ya estaba correcto)
- ✅ TikTok lazy-load (solo carga al hacer scroll)

## Tareas Pendientes

### Tarea 1: Actualizar JS de Scroll Reveal
**Archivo:** `script.js` (líneas 548-570)
- Actualizar el IntersectionObserver para observar también `.reveal-left`, `.reveal-right`, `.reveal-scale`
- Añadir lógica para actualizar `window.history` con `#seccion` al hacer scroll (clean URLs)
- Resultado: animaciones de scroll funcionando + URL limpia que cambia con el scroll

### Tarea 2: Mejorar CSS de la Tabla de Comparación
**Archivo:** `styles.css`
- Rediseñar `.comparison-table` con estilo más premium:
  - Columna de SG destacada con fondo sutil rojo
  - Bordes redondeados en la tabla
  - Hover en filas con transición suave
  - Fila de precio con estilo especial
  - Glassmorphism sutil en el contenedor

### Tarea 3: Clean URLs con #seccion
**Archivo:** `script.js`
- Añadir IntersectionObserver que detecte qué sección está visible
- Actualizar `window.history.replaceState()` con `/#seccion` sin `.html`
- Las URLs se verán como `localhost:8080/#planes`, `localhost:8080/#simulacros`

### Tarea 4: Recomendaciones de Diseño y Animaciones
Responder al usuario con sugerencias concretas de lo que se puede añadir:
- Parallax sutil en hero background
- Counter animado (números que suben)
- Efecto de typewriter en el hero title
- Hover 3D en cards (tilt effect)
- Gradient border animation en el plan featured
- Micro-interacciones en botones (ripple effect)

## Orden de Ejecución
1. Tarea 1 (JS scroll reveal + clean URLs)
2. Tarea 2 (CSS tabla comparación)
3. Tarea 4 (respuesta con recomendaciones)
