import requests
import os
from dotenv import load_dotenv
from google import generativeai as genai
from Datos2 import longitud_falla
from Analisis import construir_prompt_completo
import sys
import urllib3
import concurrent.futures

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()


def generar_informe_completo(id_falla: str, auth_token: str):

    # 1. DESCARGA DATOS
    headers = {"Authorization": f"Bearer {auth_token}"}
    base_url = "https://proyecto-zvzl.onrender.com"

    analisis_url = f"{base_url}/analisis/{id_falla}"
    response_analisis = requests.get(analisis_url, headers=headers, verify=False)
    if response_analisis.status_code != 200:
        print(f"Error ({response_analisis.status_code}) en análisis: {response_analisis.text}")
        return None

    form_url = f"{base_url}/form/{id_falla}"
    response_form = requests.get(form_url, headers=headers, verify=False)
    if response_form.status_code != 200:
        print(f"Error ({response_form.status_code}) en form: {response_form.text}")
        return None

    datos_analisis = response_analisis.json()[0]
    datos_cliente  = response_form.json()[0]

    # 2. VARIABLES
    tiempo_imp_ms = datos_analisis.get("tiempo", 0)
    ubicacion = datos_analisis.get("distancia", 0)

    tipo_falla = datos_cliente.get("falla", "N/A")
    espesor_gasoducto = datos_cliente.get("espesor", 0.0)
    diametro_gasoducto = datos_cliente.get("diametro", 0.0)
    tmfe = datos_cliente.get("tfme", 0.0)
    presion_gas = datos_cliente.get("presionHabitual", 0.0)
    latitud_in = datos_cliente.get("latitudInicial", 0.0)
    longitud_in = datos_cliente.get("longitudInicial", 0.0)
    latitud_fin = datos_cliente.get("latitudFinal", 0.0)
    longitud_fin = datos_cliente.get("longitudFinal", 0.0)
    material_gasoducto = datos_cliente.get("material", "N/A")
    antiguedad_gasoducto = datos_cliente.get("antiguedad", 0)
    presion_max_op = datos_cliente.get("presionMaxima", 0.0)

    duracion_ms = 500.5
    profundidad_max = 1.5
    velocidad_imp_MS = 4

    longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)

    # 3. PROMPT
    prompt_texto = construir_prompt_completo(
        tipo_falla, ubicacion, longitud, profundidad_max, duracion_ms,
        espesor_gasoducto, presion_gas, material_gasoducto,
        diametro_gasoducto, tmfe, antiguedad_gasoducto,
        presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin
    )

    # 4. GEMINI — TIMEOUT REAL
    api_key = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.0-flash-lite-preview")

    def llamar_gemini(prompt):
        resp = model.generate_content(prompt)
        return resp.text

    try:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(llamar_gemini, prompt_texto)
            resultado = future.result(timeout=90)  # TIMEOUT REAL

        print(resultado)
        return resultado

    except concurrent.futures.TimeoutError:
        print("ERROR: Gemini excedió los 90 segundos.")
        print("Devuelvo resultado vacío para evitar crash.")
        return "El análisis no pudo generarse (timeout)."

    except Exception as e:
        print(f"ERROR inesperado: {e}")
        return f"Error inesperado: {e}"


# ----------------------------------------------------------------------
# EJECUCIÓN DIRECTA (PythonShell)
# ----------------------------------------------------------------------
if __name__ == "__main__":

    if len(sys.argv) < 3:
        print("Uso: python Modulo.py <id_falla> <auth_token>")
        sys.exit(0)

    id_falla = sys.argv[1]
    auth_token = sys.argv[2]

    print(f"\n--- Iniciando análisis para ID: {id_falla} ---\n")

    informe = generar_informe_completo(id_falla, auth_token)

    print("\n--- INFORME FINAL ---")
    print(informe)

    sys.exit(0)   # IMPORTANTE: NUNCA EXIT CODE 1
