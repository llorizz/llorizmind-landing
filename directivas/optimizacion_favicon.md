# Directiva: Actualización de Favicon (Smart Padding)

## Objetivo
Actualizar el favicon asegurando que la imagen original NO se deforme (squash/stretch). Si la imagen original no es cuadrada, rellenar los bordes con transparencia.

## Entradas
- Imagen origen: Ruta definida por usuario o defecto.

## Salidas
- Favicon cuadrado (PNG) en `assets/images/favicon.png`.

## Lógica
1.  **Cargar imagen** con `PIL`.
2.  **Calcular dimensiones**: Obtener `width` y `height`.
3.  **Determinar lienzo**: Usar `max(width, height)` como tamaño del lado del cuadrado.
4.  **Crear fondo**: Imagen nueva RGBA vacía (transparente) de tamaño `(max_side, max_side)`.
5.  **Centrar**: Pegar imagen original en `((max_side - width) // 2, (max_side - height) // 2)`.
6.  **Redimensionar**: Escalar con `Image.Resampling.LANCZOS` a tamañoss estándar (e.g., 128x128, 64x64).
7.  **Guardar** en formato PNG.

## Restricciones y Advertencias
- **No Recortar**: A menos que se especifique, NO recortar contentido, solo agregar 'aire' transparente.
- **Relación de Aspecto**: Mantener estrictamente la relación de aspecto original.
