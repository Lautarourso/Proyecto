# distancia_min_mm = 4
# distancia_max_mm = 5
# distancia_imp_mm = distancia_max_mm - distancia_min_mm
tiempo_imp_ms = 300
tiempo_imp_s = tiempo_imp_ms * 100
# velocidad_imp = distancia_imp_mm/tiempo_imp_ms
velocidad_imp_MS = 4

def longitud_falla(tiempo_imp_s, velocidad_imp_MS):
    return tiempo_imp_s * velocidad_imp_MS  



