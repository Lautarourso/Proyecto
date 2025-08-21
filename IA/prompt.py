from google import genai
from Analisis import construir_prompt_completo

client = genai.Client(api_key="AIzaSyCBvo4j-OCu_0WYvL6F4UwfWWf2zlEjUBo")

tipo_falla = "Abolladura"
ubicacion = 2 
longitud = 50 
profundidad_min = 1.1
profundidad_max = 1.5 
delga = "D4"
tiempo_impacto = 150 
espesor_gasoducto = 12.7 
presion_gas = 16 
zona = "despoblada"
material_gasoducto = "Acero al carbono de alta resistencia"

# Construir el prompt
prompt = construir_prompt_completo(
    tipo_falla, ubicacion, longitud,
    profundidad_min, profundidad_max,
    delga, tiempo_impacto, espesor_gasoducto, 
    presion_gas, zona, material_gasoducto   
)

# Enviar a Gemini
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# Mostrar resultado
print(response.text)