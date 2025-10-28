import sys
import json
import os

def main():
    try:
        # Leer los datos enviados desde Node.js
        if len(sys.argv) < 2:
            print("No se recibieron datos.")
            return

        data = json.loads(sys.argv[1])

        print("✅ Datos recibidos correctamente desde Node.js.")
        print(json.dumps(data, indent=2, ensure_ascii=False))

        # Crear carpeta de salida si no existe
        out_folder = "datos_crudos"
        os.makedirs(out_folder, exist_ok=True)

        # Guardar los datos en un archivo local (como antes)
        ruta_salida = os.path.join(out_folder, "datos_recibidos.json")
        with open(ruta_salida, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

        print(f"📁 Datos guardados en: {ruta_salida}")