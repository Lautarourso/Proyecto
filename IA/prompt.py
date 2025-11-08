import json
#import google.generativeai as genai
from google import genai
from Analisis import construir_prompt_completo
from Numericos import ruta_salida
from Datos import tipo_falla, ubicacion, longitud, profundidad_max, espesor_gasoducto, diametro_gasoducto, presion_gas, tmfe, material_gasoducto, antiguedad_gasoducto, presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin

client = genai.Client(api_key="a")

with open(ruta_salida, "r", encoding="utf-8") as f:
    casos = json.load(f)





for caso in casos:
    prompt = construir_prompt_completo(
        tipo_falla=tipo_falla,
        ubicacion=ubicacion,
        longitud=longitud, 
        profundidad_max=profundidad_max,
        tiempo_impacto=caso["distancia"], 
        espesor_gasoducto=espesor_gasoducto, 
        diametro_gasoducto=diametro_gasoducto,
        presion_gas=presion_gas,
        tmfe=tmfe,
        material_gasoducto=material_gasoducto,
        antiguedad_gasoducto=antiguedad_gasoducto,
        presion_max_op=presion_max_op,
        longitud_in=longitud_in,
        longitud_fin=longitud_fin,
        latitud_in=latitud_in,
        latitud_fin=latitud_fin
        )



# Enviar a Gemini
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# Mostrar resultado
print(response.text)