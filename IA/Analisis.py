def construir_prompt_completo(tipo_falla, ubicacion, longitud, profundidad_min, profundidad_max, angulo_max, delga, tiempo_impacto):
    ejemplo = """
Ejemplo de informe de ingeniería:

1. Tipo de falla: Abolladura
2. Ubicación: 123.4 m
3. Longitud: 0.5 m
4. Profundidad: 6.2 mm
5. Gravedad: Alta (por profundidad > 20% del espesor)
6. Recomendación: Reemplazo o encamisado urgente.

Reglas técnicas:


Fin del ejemplo.
"""

    prompt = f"""
Actuá como un ingeniero especialista en inspección de gasoductos.
Generá un informe técnico respetando el formato y reglas del ejemplo siguiente:

{ejemplo}

Datos del caso actual:
- Tipo de falla: {tipo_falla}
- Ubicación: {ubicacion} metros
- Longitud estimada: {longitud} metros
- Profundidad: entre {profundidad_min} mm y {profundidad_max} mm
- Ángulo máximo de impacto: {angulo_max} grados
- Delga afectada: {delga}
- Duración del impacto: {tiempo_impacto} segundos

Redactá el informe final, claro y profesional.
"""
    return prompt
