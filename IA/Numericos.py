import sys
import json
import os

def main():
    try:
        if len(sys.argv) < 2:
            print("No se recibieron datos.")
            return

        data = json.loads(sys.argv[1])
        print("✅ Datos recibidos correctamente desde Node.js.")
        print(json.dumps(data, indent=2, ensure_ascii=False))

        out_folder = "datos_crudos"
        os.makedirs(out_folder, exist_ok=True)

        ruta_salida = os.path.join(out_folder, "datos_recibidos.json")
        with open(ruta_salida, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

        print(f"📁 Datos guardados en: {ruta_salida}")

    except Exception as e:
        print(f"❌ Error en el script: {e}")

if __name__ == "__main__":
    main()
