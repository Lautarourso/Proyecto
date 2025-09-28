import json
from Numericos import ruta_salida

with open(ruta_salida, "r", encoding="utf-8") as f:
    casos = json.load(f)

for caso in casos:
    # acá usás el valor que viene del JSON
    tiempo_imp_ms = caso["tiempo"]
    duracion_ms = caso["duracion"]
# velocidad_imp = distancia_imp_mm/tiempo_imp_ms
velocidad_imp_MS = 4

def longitud_falla(tiempo_imp_s, velocidad_imp_MS):
    tiempo_imp_s = tiempo_imp_ms / 1000  
    
    # longitud en metros
    longitud_m = tiempo_imp_s * velocidad_imp_MS  
    
    # paso a milímetros
    return longitud_m * 1000


tipo_falla= "Abolladura con quemadura de arco"
ubicacion= 20.3
longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)
profundidad_max=1.3      
espesor_gasoducto=12.7 
diametro_gasoducto=1000
tmfe = 241 
presion_gas=16
latitud_in = -38.656277
longitud_in = -62.276122
latitud_fin = -38.654282 
longitud_fin = -62.267444 
material_gasoducto="Acero API 5L Grado B"
antiguedad_gasoducto=20
presion_max_op = 32


