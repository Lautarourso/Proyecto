import requests
import os
from dotenv import load_dotenv
from google import genai
from Datos2 import longitud_falla
from Analisis import construir_prompt_completo
import sys

load_dotenv()

# Leer argumentos pasados desde Node
id_falla = sys.argv[1]
auth_token = sys.argv[2]

print(f"Iniciando análisis para ID: {id_falla}")

headers = {"Authorization": f"Bearer {auth_token}"}
base_url = "https://proyecto-zvzl.onrender.com"

# Descargar datos
response_analisis = requests.get(f"{base_url}/analisis/{id_falla}", headers=headers, verify=False)
response_form = requests.get(f"{base_url}/form/{id_falla}", headers=headers, verify=False)

datos_hardware = response_analisis.json()[0] if response_analisis.json() else {}
datos_cliente = response_form.json()[0] if response_form.json() else {}

# Extraer datos
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

# Crear prompt
prompt_texto = construir_prompt_completo(
    tipo_falla, ubicacion, longitud, profundidad_max, duracion_ms,
    espesor_gasoducto, presion_gas, material_gasoducto,
    diametro_gasoducto, tmfe, antiguedad_gasoducto,
    presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin
)

# Llamar IA
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt_texto
)

print("Informe generado con éxito:")
print(response.text)
