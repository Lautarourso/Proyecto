def construir_prompt_completo(tipo_falla, ubicacion, longitud, profundidad_max, tiempo_impacto, espesor_gasoducto, presion_gas, material_gasoducto, diametro_gasoducto, tmfe, antiguedad_gasoducto, presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin):
    
    prompt = f"""



    A.

    Datos del caso actual:
    - Tipo de falla: {tipo_falla}
    - Material: {material_gasoducto}
    - Ubicación: {ubicacion} metros
    - Longitud estimada: {longitud} mm 
    - Profundidad: {profundidad_max} mm
    - Duración del impacto: {tiempo_impacto} ms
    - Espesor del gasoducto: {espesor_gasoducto} mm
    - Diámetro del gasoducto: {diametro_gasoducto} mm
    - Presión habitual del gas: {presion_gas} bares
    - Presión máxima de la operación (PMO): {presion_max_op} bares
    - Tensión de Fluencia Mínima Especificada (TFME): {tmfe} MPa
    - Antiguedad del gasoducto: {antiguedad_gasoducto} años
    - Latitud de inicio del gasoducto: {latitud_in}
    - Longitud de inicio del gasoducto: {longitud_in}
    - Latitud de fin del gasoducto: {latitud_fin}
    - Longitud de fin del gasoducto: {longitud_fin}

    
    
    Redactá el informe final, claro y profesional.
    """
    
    return prompt