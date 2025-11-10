import requests
import os
from dotenv import load_dotenv
from google import genai
from Datos2 import longitud_falla
from Analisis import construir_prompt_completo

load_dotenv() 


def generar_informe_completo(id_falla: str, auth_token: str):

    """
    Gestiona el flujo completo: descarga, procesa datos, calcula la longitud
    y genera el informe final con la IA de Google.
    """
    
    # 1. PREPARACIÓN Y DESCARGA DE DATOS (Fase atómica)
    # ----------------------------------------------------------------------
    print(f"Iniciando análisis para ID: {id_falla}")
    
    headers = {"Authorization": f"Bearer {auth_token}"}
    base_url = "https://proyecto-zvzl.onrender.com" # Define la URL base una sola vez
    
    # Descarga de datos de ANÁLISIS (Hardware)
    analisis_url = f"{base_url}/analisis/{id_falla}"
    response_analisis = requests.get(analisis_url, headers=headers, verify=False)
    
    if response_analisis.status_code != 200:
        raise Exception(f"Error al descargar datos de Análisis (Hardware). Código: {response_analisis.status_code}. Mensaje: {response_analisis.text}")
        
    # Descarga de datos del FORMULARIO (Cliente/Ambiente)
    form_url = f"{base_url}/form/{id_falla}"
    response_form = requests.get(form_url, headers=headers, verify=False)
    
    if response_form.status_code != 200:
        raise Exception(f"Error al descargar datos del Formulario (Cliente). Código: {response_form.status_code}. Mensaje: {response_form.text}")

    # Almacenamiento en Memoria (Eliminamos la escritura a disco)
    # Asume que las APIs devuelven una lista y toma el primer elemento.
    datos_analisis = response_analisis.json()
    datos_form = response_form.json()

    # Si la lista no está vacía, toma el primer elemento.
    datos_hardware = datos_analisis[0] if isinstance(datos_analisis, list) and datos_analisis else {}
    datos_cliente = datos_form[0] if isinstance(datos_form, list) and datos_form else {}

    # 2. EXTRACCIÓN Y CÁLCULO DE VARIABLES
    # ----------------------------------------------------------------------

    tiempo_imp_ms = datos_hardware.get("tiempo") 
    duracion_ms = datos_hardware.get("distancia")

    tipo_falla = datos_cliente.get("falla")
    espesor_gasoducto = datos_cliente.get("espesor")
    diametro_gasoducto = datos_cliente.get("diametro")
    tmfe = datos_cliente.get("tfme")
    presion_gas = datos_cliente.get("presionHabitual")
    latitud_in = datos_cliente.get("latitudInicial") 
    longitud_in = datos_cliente.get("longitudInicial") 
    latitud_fin = datos_cliente.get("latitudFinal") 
    longitud_fin = datos_cliente.get("longitudFinal") 
    material_gasoducto = datos_cliente.get("material")
    antiguedad_gasoducto = datos_cliente.get("antiguedad")
    presion_max_op = datos_cliente.get("presionMaxima")

    ubicacion = 20.3  
    profundidad_max = 1.5
    velocidad_imp_MS = 4

    longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)


    # 3. CONSTRUCCIÓN DEL PROMPT Y LLAMADA A LA IA
    # ----------------------------------------------------------------------

    prompt_texto = construir_prompt_completo(
        tipo_falla=tipo_falla, ubicacion=ubicacion, longitud=longitud, 
        profundidad_max=profundidad_max, tiempo_impacto=duracion_ms, 
        espesor_gasoducto=espesor_gasoducto, presion_gas=presion_gas, 
        material_gasoducto=material_gasoducto, diametro_gasoducto=diametro_gasoducto, 
        tmfe=tmfe, antiguedad_gasoducto=antiguedad_gasoducto, 
        presion_max_op=presion_max_op, latitud_in=latitud_in, 
        latitud_fin=latitud_fin, longitud_in=longitud_in, 
        longitud_fin=longitud_fin
    )

    api_key = os.getenv("GEMINI_API_KEY") # Asegúrate que tu variable de entorno se llama así
    if not api_key:
        raise Exception("La variable de entorno GEMINI_API_KEY no está configurada en el servidor.")    
    
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt_texto,
    )
    
    # 4. DEVOLVER EL RESULTADO
    # ----------------------------------------------------------------------
    print("Informe generado con éxito.")
    print(response.text)
    return response.text
