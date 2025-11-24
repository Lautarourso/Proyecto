import requests
import os
from dotenv import load_dotenv
from google import generativeai as genai
from Datos2 import longitud_falla
from Analisis import construir_prompt_completo
import sys
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()

# ----------------------------------------------------------------------
# FUNCIÓN PRINCIPAL
# ----------------------------------------------------------------------
def generar_informe_completo(id_falla: str, auth_token: str):
    """
    Gestiona el flujo completo: descarga, procesa datos, calcula la longitud
    y genera el informe final con la IA.
    """

    # 1. DESCARGA DE DATOS
    # ----------------------------------------------------------------------
    headers = {"Authorization": f"Bearer {auth_token}"}
    base_url = "https://proyecto-zvzl.onrender.com"

    # Análisis (hardware)
    analisis_url = f"{base_url}/analisis/{id_falla}"
    response_analisis = requests.get(analisis_url, headers=headers, verify=False)
    if response_analisis.status_code != 200:
        raise Exception(
            f"Error ({response_analisis.status_code}) al descargar Análisis: {response_analisis.text}"
        )

    # Formulario (cliente/ambiente)
    form_url = f"{base_url}/form/{id_falla}"
    response_form = requests.get(form_url, headers=headers, verify=False)
    if response_form.status_code != 200:
        raise Exception(
            f"Error ({response_form.status_code}) al descargar Formulario: {response_form.text}"
        )

    datos_analisis = response_analisis.json()
    datos_form = response_form.json()

    datos_hardware = datos_analisis[0] if isinstance(datos_analisis, list) and datos_analisis else {}
    datos_cliente = datos_form[0] if isinstance(datos_form, list) and datos_form else {}

    # 2. EXTRACCIÓN Y PREPARACIÓN DE VARIABLES
    # ----------------------------------------------------------------------
    tiempo_imp_ms = datos_hardware.get("tiempo", 0)
    ubicacion = datos_hardware.get("distancia", 0)

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

    # Variables fijas
    duracion_ms = 500.5
    profundidad_max = 1.5
    velocidad_imp_MS = 4

    longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)

    # 3. CONSTRUCCIÓN DEL PROMPT
    # ----------------------------------------------------------------------
    prompt_texto = construir_prompt_completo(
        tipo_falla, ubicacion, longitud, profundidad_max, duracion_ms,
        espesor_gasoducto, presion_gas, material_gasoducto,
        diametro_gasoducto, tmfe, antiguedad_gasoducto,
        presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin
    )

    # 4. LLAMADA A GEMINI 1.5 PRO (SDK CORRECTO)
    # ----------------------------------------------------------------------
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise Exception("La variable de entorno GEMINI_API_KEY no está configurada.")

    try:
        genai.configure(api_key=api_key, client_options={'api_timeout': 45})

    # Modelo perfectamente compatible
   
        model = genai.GenerativeModel("gemini-2.0-flash-lite-preview")
        
        # Ejecución de la llamada
        response = model.generate_content(prompt_texto)
        resultado = response.text

 

    except Exception as e:
        # Captura errores generales, incluyendo el timeout si ocurre
        if 'timeout' in str(e).lower():
            raise Exception("La llamada a Gemini excedió el tiempo límite (45s). El prompt es demasiado largo o el servidor está saturado.")
        raise Exception(f"Error inesperado durante la llamada a Gemini: {e}")

    # PythonShell necesita imprimir el resultado final en stdout
    print(resultado)
    return resultado


# ----------------------------------------------------------------------
# EJECUCIÓN DIRECTA DESDE CONSOLA (usado por PythonShell)
# ----------------------------------------------------------------------
if __name__ == "__main__":

    if len(sys.argv) < 3:
        print("Uso: python Modulo.py <id_falla> <auth_token>")
        sys.exit(1)

    id_falla = sys.argv[1]
    auth_token = sys.argv[2]

    print(f"\n--- Iniciando análisis para ID: {id_falla} ---\n")

    try:
        informe = generar_informe_completo(id_falla, auth_token)

        print("\n--- INFORME GENERADO CON ÉXITO ---")
        print(informe)

    except Exception as e:
        print("\n--- ERROR CRÍTICO DURANTE LA GENERACIÓN DEL INFORME ---")
        print(e)
        sys.exit(1)
