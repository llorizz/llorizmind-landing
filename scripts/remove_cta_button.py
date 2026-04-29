import os

# Configuración
TARGET_FILE = 'index.html'
# Elemento exacto a eliminar. Incluimos indentación aproximada para dejarlo limpio,
# pero haremos un strip() para la búsqueda si es necesario.
# Línea 361: <a href="mailto:info@antigravity.ai" class="btn btn-primary">Solicita nuestros servicios</a>
TARGET_STRING = '<a href="mailto:info@antigravity.ai" class="btn btn-primary">Solicita nuestros servicios</a>'

def main():
    print(f"Iniciando eliminación en {TARGET_FILE}...")
    
    if not os.path.exists(TARGET_FILE):
        print(f"ERROR: No existe {TARGET_FILE}")
        return

    with open(TARGET_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    removed_count = 0
    
    for line in lines:
        if TARGET_STRING in line:
            # Verificación extra: asegurarse que es el mailto, no los otros botones
            if "mailto:info@antigravity.ai" in line:
                print(f"[ELIMINADO] Línea {lines.index(line) + 1}: {line.strip()}")
                removed_count += 1
                continue # Saltamos esta línea (no la añadimos a new_lines)
            else:
                print(f"[AVISO] Se encontró el texto pero no el href esperado en línea {lines.index(line) + 1}. No se elimina.")
                new_lines.append(line)
        else:
            new_lines.append(line)

    if removed_count == 0:
        print("ADVERTENCIA: No se encontró el elemento para eliminar.")
    else:
        print(f"Se eliminaron {removed_count} ocurrencia(s).")
        with open(TARGET_FILE, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Archivo guardado correctamente.")

if __name__ == "__main__":
    main()
