def longitud_falla(tiempo_impacto_segundos, velocidad_m_s):
    return tiempo_impacto_segundos * velocidad_m_s  

def profundidad_falla(angulo_grados):
    profundidad_mm = (angulo_grados / 30.0) * 10.0
    return profundidad_mm
