import requests
import os
from dotenv import load_dotenv


# Cargar credenciales del archivo .env
load_dotenv()
id = 10
# URLs de la API
login_url = "https://proyecto-zvzl.onrender.com/auth/login"
form_url = f"https://proyecto-zvzl.onrender.com/form/{id}"
analisis = f"https://proyecto-zvzl.onrender.com/analisis/{id}"


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
response_form = requests.get(form_url, headers=headers, verify=False)


if response_form.status_code != 200:
    print("Error al obtener datos:", response_form.status_code, response_form.text)
    exit()
datos_form = response_form.json()
print(f"Datos del formulario para ID {id} recibidos.")


response_analisis = requests.get(analisis, headers=headers, verify=False)

datos_analisis = response_analisis.json()
print(f"Datos de análisis para ID {id} recibidos.")
if response_analisis.status_code != 200:
    print("Error al obtener datos:", response_analisis.status_code, response_analisis.text)
    exit()



# Guardar datos en un archivo local
out_folder = "datos totales"
os.makedirs(out_folder, exist_ok=True)

ruta_salida = os.path.join(out_folder, f"datos_analisis{id}.json")
with open(ruta_salida, "w", encoding="utf-8") as f:
    import json
    json.dump(datos_analisis, f, ensure_ascii=False, indent=4)

print(f"Datos guardados en: {ruta_salida}")


os.makedirs(out_folder, exist_ok=True)

ruta_salida = os.path.join(out_folder, f"datos_form{id}.json")
with open(ruta_salida, "w", encoding="utf-8") as f:
    import json
    json.dump(datos_form, f, ensure_ascii=False, indent=4)

print(f"Datos guardados en: {ruta_salida}")

