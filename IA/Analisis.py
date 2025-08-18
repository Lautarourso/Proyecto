def construir_prompt_completo(tipo_falla, ubicacion, longitud,profundidad_min, profundidad_max,delga, tiempo_impacto, espesor_gasoducto, presion_gas, zona, material_gasoducto):
    ejemplo = """
Ejemplo de informe de ingeniería:

1. Tipo de falla: Abolladura
2. Ubicación: 123.4 m
3. Longitud: 500 mm
4. Profundidad: 1.3 mm
5. Espesor gasoducto: 12.7
5. Gravedad: Moderada
6. Recomendación: Monitoreo de la situación en 3 meses. Si se agrava, reemplazar tramo.




Fin del ejemplo.
"""

    prompt = f"""
Actuá como un ingeniero especialista en inspección de gasoductos.
Generá un informe técnico respetando el formato y reglas del ejemplo siguiente:


{ejemplo}

Datos del caso actual:
- Tipo de falla: {tipo_falla}
- Ubicación: {ubicacion} metros
- Longitud estimada: {longitud} mm
- Profundidad: entre {profundidad_min} mm y {profundidad_max} mm
- Delga afectada: {delga}
- Duración del impacto: {tiempo_impacto} ms
- Espesor del gasoducto: {espesor_gasoducto} mm
- Presion habitual del gas: {presion_gas} bares
- Zona: {zona}
- Material: {material_gasoducto}

Redactá el informe final, claro y profesional.
"""
    return prompt
