import json
#import google.generativeai as genai
from google import genai
from Analisis import construir_prompt_completo
from Numericos import ruta_salida
from Datos import tipo_falla, ubicacion, longitud, profundidad_max, espesor_gasoducto, diametro_gasoducto, presion_gas, tmfe, zona, material_gasoducto, antiguedad_gasoducto, presion_max_op

client = genai.Client(api_key="AIzaSyCBvo4j-OCu_0WYvL6F4UwfWWf2zlEjUBo")

with open(ruta_salida, "r", encoding="utf-8") as f:
    casos = json.load(f)

for caso in casos:
    prompt = construir_prompt_completo(
        tipo_falla=tipo_falla,
        ubicacion=ubicacion,
        longitud=longitud, 
        profundidad_max=profundidad_max,
        delga=4,
        tiempo_impacto=caso["duracion"], 
        espesor_gasoducto=espesor_gasoducto, 
        diametro_gasoducto=diametro_gasoducto,
        presion_gas=presion_gas,
        tmfe=tmfe,
        zona=zona,
        material_gasoducto=material_gasoducto,
        antiguedad_gasoducto=antiguedad_gasoducto,
        presion_max_op=presion_max_op
        )



# Enviar a Gemini
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# Mostrar resultado
print(response.text)