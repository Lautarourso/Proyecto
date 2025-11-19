def construir_prompt_completo(tipo_falla, ubicacion, longitud, profundidad_max, tiempo_impacto, espesor_gasoducto, presion_gas, material_gasoducto, diametro_gasoducto, tmfe, antiguedad_gasoducto, presion_max_op, latitud_in, latitud_fin, longitud_in, longitud_fin):
    
    # Define la variable `prompt` aquí, antes de usarla.
    prompt = f"""



    Actuá como un ingeniero especialista en inspección de gasoductos. 
    Combina tus conocimientos de ingenieria con las normativas que te voy a pasar a continuación.
    

    Reglamentos importantes a tener en cuenta:
    
    Abolladuras: 
    
    Nag-10 (Normas Argentinas Mínimas de Seguridad Para el Transporte y Distribución de Gas Natural y Otros Gases por Cañerías.):
    
    Sección 309: Reparación de caños de acero
    
    a) Toda imperfección o daño producido durante la instalación que afecte la
    aptitud para el servicio de un tramo de caño de acero, debe ser reparada por
    amolado suave o eliminada. Si la reparación se realiza por amolado suave,
    el espesor de pared remanente debe ser como mínimo igual a cualquiera de
    los puntos siguientes:
    1) el espesor mínimo requerido de acuerdo con las tolerancias
    admitidas por la especificación con la cual el caño fue fabricado; o
    2) el espesor de pared nominal requerido para la presión de diseño de
    la cañería.
    Se entiende por amolado suave aquel que se realiza de tal forma que
    produce cambios geométricos suaves y uniformes en el espesor. 


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
    
    d) Toda ranura, muesca, o abolladura que deba ser eliminada, lo será por
    reemplazo del tramo de caño. Estos defectos no pueden ser reparados
    mediante la colocación de parches o por martilleo.
    
    e) Toda quemadura de arco en caño de acero a ser operado a una presión
    que produzca una tensión circunferencial del 40% o más de la TFME, debe
    ser eliminada o reparada. Si la reparación es realizada por amolado suave,
    la quemadura de arco debe ser completamente eliminada y el espesor de
    pared remanente debe ser por lo menos igual a cualquiera de los siguientes:
    1) el espesor de pared mínimo requerido de acuerdo con la tolerancia
    admitida por la especificación con la cual fue fabricado el caño; o
    2) el espesor de pared nominal requerido por la presión de diseño de la
    cañería.


    Riesgo social:
    
    IGEM/TD/1, sección 6.7.1: Tipos de áreas: 

    Tipo "R" (Rural): Densidad de población baja, menor a 2.5 personas por hectarea.
    Tipo "S" (Suburbana): Áreas Densidad de población baja a media (Entre 2.5 y 30 personas por hectárea), y que sean mas desarrolladas, con zonas residenciales, comercios, escuelas, hospitales, entre otras infraestructuras críticas. 
    Tipo "H" : Áreas con alta densidad de población, superior a 30 personas por hectárea, que no son Áreas Tipo T. Estas áreas están asociadas con un desarrollo progresivo cerca de ubicaciones de Áreas Tipo S, por ejemplo, donde se ha construido un centro comercial, un centro de entretenimiento, un estadio deportivo, un hospital, un edificio de varios pisos cerca de un oleoducto o se ha reutilizado un edificio industrial o comercial para uso residencial. 
    Tipo "T" (Urbana): Áreas centrales de ciudades o pueblos, con una alta densidad de población resultante, por ejemplo, de una combinación de edificios de varios pisos, hospitales, grandes centros de transporte, lugares de reunión públicos, etc.

    Tipo "R": Riesgo Aceptable. El impacto se enfoca en el medio ambiente y en pérdidas económicas bajas. Gravedad de la falla: Baja
    Tipo "S": Riesgo Reducible. El impacto en la salud pública es significativo. La mitigación debe ser considerada: Gravedad de la falla: Moderada
    Tipo "H": Riesgo ALTO/Reducible. La consecuencia es muy alta debido a la dificultad de evacuación y la alta concentración de personas. Se acerca al límite de lo Intolerable. Gravedad de la falla: Moderada a Alta
    Tipo "T": Riesgo CRÍTICO/Intolerable. El riesgo social es inaceptable. Cualquier falla requiere acción inmediata. Gravedad de la falla: Alta

    ---------------
    Instrucciones específicas para tu análisis, pero no las incluyas en el informe final escrito:

    1.  **Clasificación:** Determina si la abolladura es simple, aguda o con concentrador, basándote en la descripción de la NAG-10. Para determinar si es Aguda, la IA debe utilizar la Profundidad y la Longitud estimada de la abolladura para inferir el Radio de Curvatura Mínimo. Si este es igual o menor a cinco veces el espesor del caño (R≤5×Espesor), clasifícala como Aguda, lo que lleva la Gravedad a Alta (Sección 309.b.2). Justifica tu elección.
    2.  **Cálculos:** Calcula la relación de profundidad (profundidad_max / diametro_gasoducto) y la tensión circunferencial (hoop stress = (presion_max_op/10 x diametro_gasoducto) / 2 x espesor_gasoducto) del gasoducto. Luego, compara la tensión de operación con el 40% de la TFME para determinar qué reglas de la NAG-10 debes aplicar.
    3.  **Evaluación de la gravedad:** Basándote en los cálculos, la clasificación y la aproximación a la población, tuilizando las coordenadas de inicio del tramo y las coordenadas del final del tramo, usa los criterios de la NAG-10 e IGEM/TD/1  SECCIÓN 6.7.1, combinado con tus conocimientos de ingenieria para determinar la gravedad. Si la abolladura cae en una categoría que requiere ser eliminada, la gravedad es **alta**. Si puede ser reparada o monitoreada, es **moderada** o **baja**.
    4.  **Recomendación:** La recomendación debe ser específica y técnica, basada en la NAG-10, en la IGEM/TD/1 y tus conocimientos de ingenieria. Por ejemplo, si es de gravedad alta, la recomendación es la **eliminación del tramo afectado**.
    5.  **Regla de Prioridad de Gravedad (Conservadora): La clasificación de Gravedad de la falla debe ser el resultado más alto entre el análisis de la Profundidad/Geometría (criterios NAG-10) y el análisis de la Ubicación/Consecuencia (criterios Tipo R, S, H, T). Por ejemplo, si una abolladura es técnicamente Baja (por su profundidad) pero está en un Área Tipo T (Consecuencia Alta), la Gravedad Final debe ser clasificada como **Alta**.
    Tener en cuenta, EN PRIMERA INSTANCIA, el riesgo social. En caso de que el riesgo social sea mas bajo, priorizar las caracteristicas técnicas de la falla.
    6.  **Priorizar la Seguridad: Si un dato (ej. abolladura en soldadura) resulta en gravedad **alta**, no importa si otro dato (ej. baja presión) sugiere gravedad **baja**. La IA debe elegir siempre la conclusión más conservadora.
    7.  **Justificar la Combinación de Riesgos: La recomendación debe reflejar cómo se combinan los factores. Por ejemplo: "La abolladura es superficial (0.5% del diámetro), pero el gasoducto es antiguo (35 años) y opera con ciclos de presión. Por lo tanto, se recomienda el **monitoreo de la situación para mitigar el riesgo de fatiga**, aplicando el principio ALARP."

    
    
    Generá un informe técnico respetando estrictamente el formato y reglas del ejemplo siguiente, sin especificar por escrito las instrucciones ni los cálculos hechos:
    

    1. Tipo de falla: Abolladura
    2. Ubicación: 123.4 m
    3. Longitud: 500 mm
    4. Profundidad: 1.3 mm
    5. Espesor gasoducto: 12.7 mm
    6. Delga afectada: D4
    6. Área: Tipo "T" (Urbana)
    7. Gravedad: Moderada
    8. Recomendación: Se identificó una abolladura simple con una profundidad de 1.3 mm, lo que equivale a un 4.0% del diámetro nominal. Esto es menor al 6% permitido por la normativa NAG-10 y otros estándares. Sin embargo, al estar el gasoducto en una zona urbana, la gravedad pasa a ser alta. Se debe implementar un plan de reparación de la abolladura a traves de amolado suave. 
    
    Fin del ejemplo.

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