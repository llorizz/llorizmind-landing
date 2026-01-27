# Directivas de Diseño y Desarrollo Web  
## Estilo Anti-Gravity (versión robusta y escalable)

Estas directivas definen cómo construir una web de alto impacto visual, alto rendimiento y preparada para escalar, inspirada en principios de Google (UX, performance, accesibilidad y semántica), adaptadas a un diseño oscuro, tecnológico y orientado a conversión.

---

## 1. Principios Fundamentales

### 1.1 Claridad antes que complejidad
- Cada sección debe responder a **una sola pregunta del usuario**.
- Un CTA principal por viewport.
- El texto debe poder entenderse sin leer toda la página.

### 1.2 Diseño con profundidad (Anti-Gravity)
- Sensación de capas flotantes mediante:
  - Gradientes suaves
  - Sombras difusas
  - Bordes luminosos sutiles
- Evitar ruido visual: el fondo nunca compite con el contenido.

### 1.3 Performance como feature
- El usuario debe **sentir** que la web es rápida.
- Animaciones solo si refuerzan jerarquía o comprensión.

---

## 2. Arquitectura Visual

### 2.1 Hero Section
- Fondo oscuro con gradiente radial o lineal.
- Elementos abstractos (ondas, arcos, partículas) **no interactivos**.
- Jerarquía obligatoria:
  1. Claim principal (H1)
  2. Subclaim explicativo (máx. 2 líneas)
  3. CTA primario
  4. Prueba de autoridad (badge, claim corto)

Ejemplo:
- **Automatiza Hoy. Lidera Mañana.**
- Transformamos operaciones complejas en flujos simples con IA.

---

### 2.2 Cards flotantes
- Uso de grid (3 columnas desktop, 1 mobile).
- Todas las cards:
  - Misma altura
  - Mismo padding
  - Borde sutil + glow
- El contenido debe leerse sin hover.

Estructura de card:
- Icono simple
- Título corto
- Descripción accionable (no marketing vacío)

---

### 2.3 Ritmo vertical
- Alternar:
  - Secciones de lectura
  - Secciones visuales
- No más de 2 bloques densos consecutivos.
- Espaciado generoso (whitespace intencional).

---

## 3. Tipografía

### 3.1 Jerarquía estricta
- H1: impacto emocional
- H2: beneficio o promesa
- H3: explicación funcional
- P: máximo 3 líneas por párrafo

### 3.2 Reglas
- No usar más de 2 familias tipográficas.
- Interlineado amplio (1.4–1.6).
- Evitar texto gris claro sobre fondo oscuro sin contraste suficiente.

---

## 4. Color y Contraste

### 4.1 Paleta
- Base oscura (azules / negros profundos)
- Color primario para CTAs
- Color secundario solo para acentos

### 4.2 Accesibilidad
- Contraste mínimo WCAG AA.
- El CTA debe destacar incluso para usuarios con daltonismo.
- Nunca usar color como único indicador de estado.

---

## 5. Interacción y Animación

### 5.1 Animaciones permitidas
- Fade + translate suave
- Delay progresivo por sección
- Micro-interacciones en hover

### 5.2 Prohibido
- Animaciones automáticas largas
- Loops infinitos decorativos
- Scroll hijacking

### 5.3 Regla de oro
> Si la animación no aporta comprensión, se elimina.

---

## 6. UX y Conversión

### 6.1 CTA
- Texto accionable:  
  ❌ “Enviar”  
  ✅ “Solicita nuestros servicios”
- Siempre visible antes del primer scroll.
- Repetido estratégicamente, no obsesivamente.

### 6.2 Copy orientado a negocio
- Hablar de resultados, no de features.
- Evitar buzzwords sin contexto.
- Cada sección debe responder:
  > ¿Por qué me importa esto como empresa?

---

## 7. SEO y Semántica

### 7.1 Estructura
- Un solo H1 por página.
- Secciones bien delimitadas (`section`, `article`).
- Navegación clara y rastreable.

### 7.2 Contenido
- Texto real, no solo visual.
- Claims respaldados por explicaciones.
- Titles y meta descriptions únicos.

---

## 8. Performance (Core Web Vitals)

### 8.1 Obligatorio
- LCP < 2.5s
- CLS ≈ 0
- INP optimizado (interacciones rápidas)

### 8.2 Técnicas recomendadas
- Imágenes optimizadas y lazy loading.
- Fuentes preload.
- JS mínimo y diferido.
- Animaciones con `transform` y `opacity`.

---

## 9. Escalabilidad del Diseño

### 9.1 Sistema, no páginas
- Todo componente debe ser reutilizable.
- Variantes definidas (primary, secondary, minimal).

### 9.2 Preparado para crecer
- Añadir servicios no debe romper el layout.
- El diseño debe aguantar más contenido sin perder claridad.

---

## 10. Sensación Final Deseada

La web debe transmitir:
- Control
- Precisión
- Confianza técnica
- Autoridad sin arrogancia

Si parece lenta, confusa o sobrecargada, está mal, aunque “se vea bonita”.

---

**Resumen ejecutivo**  
> Diseño oscuro, profundo y elegante + UX clara + performance agresiva + copy orientado a negocio = web que convierte y escala.
