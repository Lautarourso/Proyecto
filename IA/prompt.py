from google import genai
from Analisis import construir_prompt_completo

client = genai.Client(api_key="AIzaSyBWJ0hPb9E5G54J74kpQjWeDm-P2SpicJQ")

tipo_falla = "Abolladura"
ubicacion = 123.4 
longitud = 500 
profundidad_min = 2.3
profundidad_max = 3.8 
delga = "D4"
tiempo_impacto = 800 
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