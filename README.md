# Creador de Páginas Web

Sistema de 3 componentes para desarrollo autónomo y determinista.

## Estructura del Proyecto

```
.
├── .tmp/                      # Espacio temporal (puede borrarse)
├── directivas/                # SOPs y arquitecturas de tareas
│   ├── directiva_ejemplo.md   # Plantilla base
│   └── ...
├── scripts/                   # Scripts de Python ejecutables
│   └── ...
├── requirements.txt           # Dependencias de Python
├── .env                       # Variables de entorno y credenciales
└── .gitignore                 # Archivos a excluir del control de versiones
```

## Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configurar variables de entorno**:
   - Copiar `.env` y añadir tus claves API

3. **Ejecutar scripts**:
   ```bash
   python scripts/nombre_del_script.py
   ```

## Flujo de Trabajo

1. **Consultar/Crear Directiva**: Revisa `directivas/` antes de programar
2. **Ejecutar Código**: Genera scripts basados en la directiva
3. **Observar y Aprender**: Si falla, actualiza código Y directiva

## Mantenimiento

- Actualizar `requirements.txt` cuando se añadan nuevas librerías
- Documentar restricciones en las directivas cuando se descubran errores
- Mantener `.tmp/` limpio de archivos obsoletos
