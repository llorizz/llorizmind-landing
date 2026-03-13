# Directiva: Eliminación de Elementos Web

**Objetivo:** Eliminar etiquetas HTML específicas de un archivo de manera precisa, asegurando que solo se elimine el elemento objetivo y no otros similares (falsos positivos).

## Entradas
- Archivo objetivo: `index.html`
- Elemento a eliminar (cadena exacta o identificador único).
- Contexto (opcional, para asegurar que es la sección correcta).

## Proceso (Lógica del Script)
1.  **Leer** el archivo `index.html` completo.
2.  **Identificar** el bloque exacto a eliminar.
    - *Estrategia:* Usar el contenido exacto de la etiqueta si es único.
    - *Si hay duplicados:* Verificar atributos únicos (como `href`, `id`, `class` específica).
3.  **Verificar** unicidad o contexto antes de borrar.
    - Si la cadena aparece múltiples veces y solo queremos borrar una, debemos asegurarnos de que el script distingue cuál es (ej. por el `href="mailto:..."`).
4.  **Reemplazar** la ocurrencia por una cadena vacía (o eliminar la línea si está aislado).
5.  **Guardar** el archivo.
6.  **Verificación**: Confirmar que el número de ocurrencias bajó.

## Restricciones
- No usar regex frágiles que puedan romper el anidamiento HTML si no es estrictamente necesario.
- Preferir búsqueda por cadena literal si el formato es consistente.
- Cuidado con dejar líneas en blanco extrañas o romper la indentación (aunque HTML es tolerante, el código debe quedar limpio).

## Salida Esperada
- Archivo modificado sin el elemento.
- Log de confirmación.
