import requests
import os
from dotenv import load_dotenv
from google import genai
from Datos2 import longitud_falla
from Analisis import construir_prompt_completo
import sys
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()

# Leer argumentos pasados desde Node
def generar_informe_completo(id_falla: str, auth_token: str):
    """
    Gestiona el flujo completo: descarga, procesa datos, calcula la longitud
    y genera el informe final con la IA.
    """
    
    # 1. PREPARACIÓN Y DESCARGA DE DATOS (Fase Atómica)
    # ----------------------------------------------------------------------
    headers = {"Authorization": f"Bearer {auth_token}"}
    base_url = "https://proyecto-zvzl.onrender.com"
    
    # Descarga de datos de ANÁLISIS (Hardware)
    analisis_url = f"{base_url}/analisis/{id_falla}"
    response_analisis = requests.get(analisis_url, headers=headers, verify=False)
    if response_analisis.status_code != 200:
        raise Exception(f"Error ({response_analisis.status_code}) al descargar Análisis: {response_analisis.text}")
        
    # Descarga de datos del FORMULARIO (Cliente/Ambiente)
    form_url = f"{base_url}/form/{id_falla}"
    response_form = requests.get(form_url, headers=headers, verify=False)
    if response_form.status_code != 200:
        raise Exception(f"Error ({response_form.status_code}) al descargar Formulario: {response_form.text}")

    # Almacenamiento Seguro en Memoria
    datos_analisis = response_analisis.json()
    datos_form = response_form.json()

    # Si la lista no está vacía, toma el primer elemento. (Manejo de API wrapper)
    datos_hardware = datos_analisis[0] if isinstance(datos_analisis, list) and datos_analisis else {}
    datos_cliente = datos_form[0] if isinstance(datos_form, list) and datos_form else {}


    # 2. EXTRACCIÓN Y CÁLCULO DE VARIABLES (Ajustado para seguridad con valores por defecto)
    # ----------------------------------------------------------------------
    
    # Usar 0 o "N/A" para prevenir errores 'NoneType' en cálculos o llamadas a la IA.
    tiempo_imp_ms = datos_hardware.get("tiempo", 0)
    duracion_ms = datos_hardware.get("distancia", 0) 
    
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

    # Variables Fijas/Estáticas (idealmente estas también vendrían de la DB)
    ubicacion = 20.3 
    profundidad_max = 1.5
    velocidad_imp_MS = 4

    longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)


    # 3. CONSTRUCCIÓN DEL PROMPT Y LLAMADA A LA IA
    # ----------------------------------------------------------------------

    prompt_texto = construir_prompt_completo(
        tipo_falla, ubicacion, longitud, profundidad_max, duracion_ms,
        espesor_gasoducto, presion_gas, material_gasoducto,
        diametro_gasoducto, tmfe, antiguedad_gasoducto,
        presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin
    )

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise Exception("La variable de entorno GEMINI_API_KEY no está configurada.")
        
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt_texto
    )
    
    # Devolver el texto del informe para que el Back-End lo envíe al Front-End
    return response.text


# --- 2. BLOQUE DE EJECUCIÓN (Para testing o uso de línea de comandos) ---

if __name__ == "__main__":
    
    # Este bloque solo se ejecuta si corres el script directamente: python generador_informe.py
    
    if len(sys.argv) < 3:
        print("Uso: python generador_informe.py <id_falla> <auth_token>")
        sys.exit(1)
        
    # Extrae argumentos de línea de comandos
    id_falla = sys.argv[1]
    auth_token = sys.argv[2]
    
    print(f"\n--- Iniciando análisis para ID: {id_falla} ---\n")
    
    try:
        informe = generar_informe_completo(id_falla, auth_token)
        
        print("\n--- INFORME GENERADO CON ÉXITO ---")
        print(informe)
        
    except Exception as e:
        print(f"\n--- ERROR CRÍTICO DURANTE LA GENERACIÓN DEL INFORME ---")
        print(e)
        sys.exit(1)


        