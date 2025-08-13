from google import genai
from Analisis import construir_prompt_completo

client = genai.Client(api_key="AIzaSyBWJ0hPb9E5G54J74kpQjWeDm-P2SpicJQ")

tipo_falla = "Abolladura"
ubicacion = 123.4
longitud = 0.5
profundidad_min = 6.2
profundidad_max = 7.8
angulo_max = 45
delga = "D12"
tiempo_impacto = 0.8

# Construir el prompt
prompt = construir_prompt_completo(
    tipo_falla, ubicacion, longitud,
    profundidad_min, profundidad_max,
    angulo_max, delga, tiempo_impacto
)

# Enviar a Gemini
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# Mostrar resultado
print(response.text)