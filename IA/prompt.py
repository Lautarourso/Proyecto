import json
from google import genai
from Analisis import construir_prompt_completo
from Numericos import ruta_salida

client = genai.Client(api_key="AIzaSyCBvo4j-OCu_0WYvL6F4UwfWWf2zlEjUBo")

with open(ruta_salida, "r", encoding="utf-8") as f:
    casos = json.load(f)

for caso in casos:
    prompt = construir_prompt_completo(
        caso["tipo_falla"] 
        caso["ubicacion"] 
        caso["longitud"] 
        caso["profundidad_min"]
        caso["profundidad_max"]
        caso["delga"]
        caso["tiempo_impacto"] 
        caso["espesor_gasoducto"] 
        caso["presion_gas"]
        caso["zona"]
        caso["material_gasoducto"
        )



# Enviar a Gemini
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# Mostrar resultado
print(response.text)