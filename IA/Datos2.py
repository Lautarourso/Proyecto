velocidad_imp_MS = 4


def longitud_falla(tiempo_imp_ms_param, velocidad_imp_MS):
    tiempo_imp_s = tiempo_imp_ms_param/ 1000  
    
    # longitud en metros
    longitud_m = tiempo_imp_s * velocidad_imp_MS  
    
    # paso a milímetros
    return longitud_m * 1000

