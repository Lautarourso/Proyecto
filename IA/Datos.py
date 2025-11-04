import json
from Numericos import ruta_salida
from DatosForm import ruta_salida



# velocidad_imp = distancia_imp_mm/tiempo_imp_ms
velocidad_imp_MS = 4


def longitud_falla(tiempo_imp_ms_param, velocidad_imp_MS):
    tiempo_imp_s = tiempo_imp_ms_param/ 1000  
    
    # longitud en metros
    longitud_m = tiempo_imp_s * velocidad_imp_MS  
    
    # paso a milímetros
    return longitud_m * 1000



tiempo_imp_ms = ["tiempo"]
duracion_ms = ["distancia"]



    






tipo_falla= ["falla"]
ubicacion= 20.3
longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)
profundidad_max=1.5      
espesor_gasoducto=["espesor"] 
diametro_gasoducto=["diametro"]
tmfe = ["tfme"] 
presion_gas=["presionHabitual"]
latitud_in = ["latitudInicial"] 
longitud_in = ["longitudInicial"] 
latitud_fin = ["latitudFinal"] 
longitud_fin = ["longitudFinal"]  
material_gasoducto=antiguedad_gasoducto=["material"]
antiguedad_gasoducto=["antiguedad"]
presion_max_op = ["presionMaxima"]


