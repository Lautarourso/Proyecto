def construir_prompt_completo(tipo_falla, ubicacion, longitud, profundidad_max, delga, tiempo_impacto, espesor_gasoducto, presion_gas, zona, material_gasoducto, diametro_gasoducto, tmfe):
    
    # Define la variable `prompt` aquí, antes de usarla.
    prompt = f"""



    Actuá como un ingeniero especialista en inspección de gasoductos. 
    Combina tus conocimientos de ingenieria con las normativas que te voy a pasar a continuación.
    

    Reglamentos importantes a tener en cuenta:
    
    Abolladuras: 
    
    Nag-10 (Normas Argentinas Mínimas de Seguridad Para el Transporte y Distribución de Gas Natural y Otros Gases por Cañerías.):
    
    Sección 309: Reparación de caños de acero
    
    b) Todas las abolladuras que se indican seguidamente deben ser
    eliminadas del caño de acero:
    1) Una abolladura simple cuya profundidad sea superior al 6% del
    diámetro nominal del caño.
    2) Una abolladura aguda.
    3) Una abolladura que afecte a una soldadura longitudinal o soldadura
    transversal.
    4) En líneas a ser operadas a una presión que produzca una tensión
    circunferencial menor al 40% de la TFME, todas las abolladuras con
    concentrador cuya profundidad supere el 2% del diámetro nominal del
    caño.
    5) En líneas a ser operadas a una presión que produzca una tensión
    circunferencial del 40% o más de la TFME, las abolladuras simples
    cuya profundidad supere el 3% del diámetro nominal del caño y todas
    las abolladuras con concentrador.
    c) En cañerías de acero, las abolladuras que se indican seguidamente se
    pueden reparar, mediante algún método de reparación en el cual ensayos y
    análisis confiables de ingeniería demuestren que la aptitud para el servicio
    de la cañería ha sido restaurada:
    1) En líneas a ser operadas a una presión que produzca una tensión
    circunferencial menor al 40% de la TFME:
    i. Todas las abolladuras con concentrador cuya profundidad no
    supere el 2% del diámetro nominal del caño.
    ii. Todas las abolladuras simples cuya profundidad no supere el 6%
    del diámetro nominal del caño.
    Página 9
    Adenda Nº 2 año 2016 de la NAG-100 año 1993
    2) En líneas a ser operadas a una presión que produzca una tensión
    circunferencial del 40% o más de la TFME, todas las abolladuras
    simples cuya profundidad no supere el 3% del diámetro nominal del
    caño.
    Para los propósitos de esta sección una "abolladura" es una deformación
    plástica permanente de la sección circular de la cañería.
    - La profundidad de la abolladura es medida como la distancia entre su
    punto más bajo y la prolongación de la sección circular original del
    caño.
    - Una abolladura simple es aquella cuyos cambios de curvatura son
    suaves y no contiene concentradores ni afecta soldaduras.
    - Una abolladura aguda es aquella que causa un cambio abrupto en la
    sección circular. Se define como cambio abrupto cuando el radio de
    curvatura de la parte más puntiaguda es igual o menor a cinco veces
    el espesor del caño.
    - Una abolladura con concentrador es aquella que contiene un defecto
    o discontinuidad (rayadura, ranura o quemadura de arco, etc.) cuya
    profundidad es superior al 10% del espesor nominal de la cañería.
    



    

    Instrucciones específicas para tu análisis, pero no las incluyas en el informe final escrito:

    1.  **Clasificación:** Determina si la abolladura es simple, aguda o con concentrador, basándote en la descripción de la NAG-10 y en los datos del impacto (duración, longitud). Justifica tu elección.
    2.  **Cálculos:** Calcula la relación de profundidad (profundidad_max / diametro_gasoducto) y la tensión circunferencial (hoop stress) del gasoducto. Luego, compara la tensión de operación con el 40% de la TFME para determinar qué reglas de la NAG-10 debes aplicar.
    3.  **Evaluación de la gravedad:** Basándote en los cálculos y la clasificación, usa los criterios de la NAG-10 para determinar la gravedad. Si la abolladura cae en una categoría que requiere ser eliminada, la gravedad es **alta**. Si puede ser reparada o monitoreada, es **moderada** o **baja**.
    4.  **Recomendación:** La recomendación debe ser específica y técnica, basada en la NAG-10. Por ejemplo, si es de gravedad alta, la recomendación es la **eliminación del tramo afectado**.

    
    
    Generá un informe técnico respetando estrictamente el formato y reglas del ejemplo siguiente:
    

    1. Tipo de falla: Abolladura
    2. Ubicación: 123.4 m
    3. Longitud: 500 mm
    4. Profundidad: 1.3 mm
    5. Espesor gasoducto: 12.7 mm
    6. Zona: Despoblada
    7. Gravedad: Moderada
    8. Recomendación: Se identificó una abolladura simple con una profundidad de 1.3 mm, lo que equivale a un 4.0% del diámetro nominal. Esto es menor al 6% permitido por la normativa NAG-10 y otros estándares. No representa un riesgo inminente para la operación. Sin embargo, se recomienda realizar un monitoreo de la situación mediante una inspección visual o una nueva corrida de herramienta de inspección en los próximos 12 meses. Si se observan signos de corrosión, fatiga o se agrava la deformación, se deberá considerar el reemplazo o reparación del tramo afectado mediante soldadura de recubrimiento o refuerzo de la zona.
    
    Fin del ejemplo.

    Datos del caso actual:
    - Tipo de falla: {tipo_falla}
    - Material: {material_gasoducto}
    - Ubicación: {ubicacion} metros
    - Longitud estimada: {longitud} mm 
    - Profundidad: {profundidad_max} mm
    - Delga afectada: D{delga}
    - Duración del impacto: {tiempo_impacto} ms
    - Espesor del gasoducto: {espesor_gasoducto} mm
    - Diámetro del gasoducto: {diametro_gasoducto} cm
    - Presion habitual del gas: {presion_gas} bares
    - Tensión de Fluencia Mínima Especificada (TFME): {tmfe} MPa
    - Zona: {zona}
    
    
    Redactá el informe final, claro y profesional.
    """
    
    return prompt