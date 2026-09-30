# SEO checklist — llorizzmind.com

Objetivo: posicionar LlorizzMind en búsquedas de inmobiliarias que necesitan atender leads cuando su equipo no está disponible o está saturado.

## Fase 1 — Ajustes técnicos y limpieza
- [x] Unificar la marca a "LlorizzMind" en todos los archivos.
- [x] Eliminar la etiqueta `<meta name="keywords">`.
- [x] Home: sustituir las menciones a portales (demo del hero, chips del paso 01, pipeline) por canales: WhatsApp, Instagram y Web.
- [x] Home: reescribir meta description, og:description y twitter:description (máx. 155 caracteres).
- [x] Home, FAQ: sustituir "¿Se integra con Idealista y Fotocasa?" por "¿Qué canales atiende el agente?" y actualizar "¿Necesito cambiar mi CRM actual?".
- [x] Crear `netlify.toml` (404 forzados para `/directivas/*`, `/scripts/*`, `/README.md`, `/requirements.txt`; caché larga para `/assets/*`).
- [x] Quitar de `robots.txt` los `Disallow` de esas rutas (mantener `Allow: /` y `Sitemap`).
- [x] Crear `404.html` minimalista con enlace a la home y a la demo (`noindex`).
- [x] Rendimiento: `width`/`height` en imágenes, `loading="lazy"` fuera del primer pantallazo, `defer` en scripts, preload de fuentes, WebP cuando sea posible.
  - Nota: no se convierte a WebP. Las únicas imágenes son logos y favicon PNG de 7–10 KB (ganancia despreciable) y `og.png`, que debe seguir en PNG para las redes sociales.
- [x] Revisar que cada `<img>` tenga un `alt` descriptivo.

## Fase 2 — Páginas de servicio
- [x] `/agente-ia-whatsapp-inmobiliaria/`
- [x] `/atender-leads-fuera-de-horario/`
- [x] `/crm-inmobiliario-con-ia/`
- [x] `/precios/`
- [x] Añadir "Precios" al header (Cómo funciona, Producto, Precios, FAQ, Ver demo).
- [x] Footer: columna "Soluciones" con las 3 páginas de servicio, Precios y Blog.
- [x] Home: enlazar cada página desde la sección que le corresponda.
- [x] `script.js`: cada bloque que depende de elementos de la home (nav, demo del hero, línea y panel de "Cómo funciona", formulario) comprueba que sus elementos existen. No hay tabs del CRM en el script.

## Fase 3 — Datos estructurados (JSON-LD)
- [x] Home: `Organization` (name, url, logo navy, email, sameAs Instagram, founder Person Diego Lloria CEO con sameAs LinkedIn). Sin dirección.
- [x] Home: `WebSite` y `FAQPage` con texto idéntico al visible.
- [x] Cada página de servicio: `Service`, `BreadcrumbList` y `FAQPage`.
- [x] Artículos del blog: `BlogPosting` (author Person Diego Lloria, datePublished, dateModified, image).
- [x] Validar mentalmente contra schema.org; nada en el JSON-LD que no esté visible.
  - Excepción aceptada: `founder` (Diego Lloria) en la home lo pide el brief aunque no se nombra en la página; se ve como autor en el blog.
  - Instagram añadido como enlace en el footer para que el `sameAs` de `Organization` sea visible.

## Ajustes de privacidad y formulario (antes de la Fase 4)
- [x] Auditoría de cookies: la web no instala cookies ni usa localStorage/sessionStorage; sin analítica, píxeles, iframes ni Google Fonts.
- [x] Eliminar FormSubmit (script.js, `action` del formulario y campos ocultos `_subject`, `_template`, `_captcha`).
- [x] Si el envío a n8n falla, mensaje de error con enlace a montero@llorizzmind.com.
- [x] Sin JavaScript: `action` del formulario → webhook de n8n; campos `required` para validación nativa (con JS se desactiva y valida script.js).
- [x] Página `/gracias/` (`noindex`, fuera del sitemap).
- [x] El envío con JavaScript incluye `_honey`: el filtro de spam de n8n cubre los dos casos (ya no se filtra en el navegador).
- [x] www.llorizzmind.com redirige con 301 a https://llorizzmind.com (Netlify): no hace falta añadir www a Allowed Origins.
- [x] privacidad.html: sección 8 reescrita (sin cookies ni almacenamiento en el navegador). No había menciones a FormSubmit.

## Fase 4 — Blog
- [x] `/blog/`: índice minimalista.
- [x] Plantilla de artículo reutilizable.
- [x] Artículo `/blog/como-atender-leads-inmobiliarios-fuera-de-horario/`.
- [x] Artículo `/blog/preguntas-para-cualificar-comprador-vivienda/`.
- [x] "Blog" en el footer (no en el menú principal).
  - Blog enlazado desde la columna "Soluciones" del footer en todas las páginas.

## Fase 5 — Sitemap y verificación final
- [x] Actualizar `sitemap.xml` con todas las URLs y `lastmod` de hoy; quitar bloques comentados obsoletos. `/gracias/` queda fuera.
- [x] Comprobar: un H1 por página, sin enlaces rotos, canonical correcto, sin portales, marca siempre "LlorizzMind", ningún "usted", ningún `[PENDIENTE]` sin anotar.
- [x] Añadir la sección "Pasos manuales para Diego".
  - Verificación automática: 12 páginas, 8 URLs en el sitemap; un H1 por página, canonical = URL, sin enlaces ni anclas rotas, JSON-LD sin tipos duplicados y FAQ idénticas a lo visible, titles ≤ 60 y descriptions ≤ 155.

## Pendientes
- [x] Enlaces a `/blog/` y a los 2 artículos: las páginas ya existen.
- [x] URL de Instagram (https://www.instagram.com/llorizzmind/) — añadida como `sameAs` de `Organization` y en el footer.
- [x] URL de LinkedIn (https://www.linkedin.com/in/diego-lloria-39ba5b396/) — `sameAs` del `Person` (home y artículos) y enlace de la firma del autor.

## Pasos manuales para Diego
- [ ] Revisar y aprobar el texto de los 2 artículos del blog antes de desplegar.
- [ ] Configurar en n8n las respuestas del webhook del formulario (JSON 200 con JS, redirección 303 a `/gracias/` sin JS, errores 500, filtro `_honey` para ambos envíos) antes de desplegar.
- [ ] Desplegar en Netlify y verificar que `/directivas/` y `/scripts/` devuelven 404.
- [ ] Enviar un formulario real tras el despliegue (con y sin JavaScript) y comprobar que el lead llega a n8n y a Supabase.
- [ ] Enviar el sitemap en Google Search Console.
- [ ] Solicitar la indexación manual de cada URL nueva con "Inspección de URLs".
- [ ] Validar los datos estructurados en la Prueba de resultados enriquecidos de Google.
- [ ] Pasar PageSpeed Insights a la home y a una página de servicio.
