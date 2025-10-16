import json
from Numericos import ruta_salida



id_falla = 49  

# velocidad_imp = distancia_imp_mm/tiempo_imp_ms
velocidad_imp_MS = 4


def longitud_falla(tiempo_imp_ms_param, velocidad_imp_MS):
    tiempo_imp_s = tiempo_imp_ms_param/ 1000  
    
    # longitud en metros
    longitud_m = tiempo_imp_s * velocidad_imp_MS  
    
    # paso a milímetros
    return longitud_m * 1000


with open(ruta_salida, "r", encoding="utf-8") as f:
    casos = json.load(f)

for caso in casos:
      if caso.get("id") == id_falla:
        caso_a_analizar = caso
        break


if caso_a_analizar:     
    tiempo_imp_ms = caso_a_analizar["tiempo"]
    duracion_ms = caso_a_analizar["distancia"]


    longitud_calculada = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)

    print(f"ID Encontrado: {id_falla}")




tipo_falla= "Abolladura"
ubicacion= 20.3
longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)
profundidad_max=1.5      
espesor_gasoducto=12.7 
diametro_gasoducto=100
tmfe = 241 
presion_gas=16
latitud_in = -37.334044 
longitud_in = -59.145896
latitud_fin = -37.332270  
longitud_fin = -59.136610 
material_gasoducto="Acero API 5L Grado B"
antiguedad_gasoducto=10
presion_max_op = 32


