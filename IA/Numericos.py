import requests
import os
from dotenv import load_dotenv


# Cargar credenciales del archivo .env
load_dotenv()

# URLs de la API
login_url = "https://proyecto-zvzl.onrender.com/auth/login"
datos_url = "https://proyecto-zvzl.onrender.com/analisis/gettiempo"
#datos_url = "https://proyecto-zvzl.onrender.com/analisis/gettiempo"

email = "lautarourso@gmail.com"
password = "Lautaro"

# Credenciales
#email = os.getenv("USER_EMAIL")
#password = os.getenv("USER_PASS")

# Login para obtener el token
resp = requests.post(login_url, json={
    "email": email,
    "password": password
}, verify=False)

if resp.status_code != 200:
    print("Error al loguearse:", resp.text)
    exit()

token = resp.json().get("token")
print("Token recibido:", token)

# Headers con autorización
headers = {
    "Authorization": f"Bearer {token}"
}

# Obtener datos numéricos
response = requests.get(datos_url, headers=headers, verify=False)

if response.status_code != 200:
    print("Error al obtener datos:", response.status_code, response.text)
    exit()

datos = response.json()

# Guardar datos en un archivo local
out_folder = "datos crudos"
os.makedirs(out_folder, exist_ok=True)

ruta_salida = os.path.join(out_folder, "datos_puerco.json")
with open(ruta_salida, "w", encoding="utf-8") as f:
    import json
    json.dump(datos, f, ensure_ascii=False, indent=4)

print(f"Datos guardados en: {ruta_salida}")
