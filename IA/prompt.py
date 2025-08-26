import json
from google import genai
from Analisis import construir_prompt_completo
from Numericos import ruta_salida
from Datos import tipo_falla, ubicacion, longitud, profundidad_min, profundidad_max, espesor_gasoducto, presion_gas, zona, material_gasoducto

client = genai.Client(api_key="AIzaSyCBvo4j-OCu_0WYvL6F4UwfWWf2zlEjUBo")

with open(ruta_salida, "r", encoding="utf-8") as f:
    casos = json.load(f)

for caso in casos:
    prompt = construir_prompt_completo(
        tipo_falla=tipo_falla,
        ubicacion=ubicacion,
        longitud=longitud, 
        profundidad_min=profundidad_min,
        profundidad_max=profundidad_max,
        delga=4,
        tiempo_impacto=caso["duracion"], 
        espesor_gasoducto=espesor_gasoducto, 
        presion_gas=presion_gas,
        zona=zona,
        material_gasoducto=material_gasoducto,
        )



# Enviar a Gemini
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# Mostrar resultado
print(response.text)