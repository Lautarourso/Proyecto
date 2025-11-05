import json
from DatosForm import ruta_form, ruta_hardware



try:
    with open(ruta_hardware, "r", encoding="utf-8") as f:
        casos_hardware = json.load(f)
        datos_hardware = casos_hardware[0] if casos_hardware else {}
    
    with open(ruta_form, "r", encoding="utf-8") as f:
        # Asumo que el JSON de datos form (cliente) devuelve una lista de formularios y tomamos el primero
        casos_cliente = json.load(f)
        datos_cliente = casos_cliente[0] if casos_cliente else {}

except FileNotFoundError:
    print("Error: Uno de los archivos JSON de datos no se encontró.")
    exit()
except json.JSONDecodeError:
    print("Error: Fallo al decodificar uno de los archivos JSON.")
    exit()

# velocidad_imp = distancia_imp_mm/tiempo_imp_ms
velocidad_imp_MS = 4


def longitud_falla(tiempo_imp_ms_param, velocidad_imp_MS):
    tiempo_imp_s = tiempo_imp_ms_param/ 1000  
    
    # longitud en metros
    longitud_m = tiempo_imp_s * velocidad_imp_MS  
    
    # paso a milímetros
    return longitud_m * 1000



tiempo_imp_ms = datos_hardware.get("tiempo") 
duracion_ms = datos_hardware.get("distancia")

tipo_falla = datos_cliente.get("falla")
espesor_gasoducto = datos_cliente.get("espesor")
diametro_gasoducto = datos_cliente.get("diametro")
tmfe = datos_cliente.get("tfme", 0)
presion_gas = datos_cliente.get("presionHabitual")
latitud_in = datos_cliente.get("latitudInicial") 
longitud_in = datos_cliente.get("longitudInicial") 
latitud_fin = datos_cliente.get("latitudFinal") 
longitud_fin = datos_cliente.get("longitudFinal", 0) 
material_gasoducto = datos_cliente.get("material", "Desconocido")
antiguedad_gasoducto = datos_cliente.get("antiguedad", 0)
presion_max_op = datos_cliente.get("presionMaxima", 0)

ubicacion = 20.3  
profundidad_max = 1.5

longitud = longitud_falla(tiempo_imp_ms, velocidad_imp_MS)