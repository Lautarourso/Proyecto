import requests
import os
from urllib.request import urlretrieve
from dotenv import load_dotenv

# Obtener el token de autenticación para logearse, y descargar el video

load_dotenv()

email = os.getenv("USER_EMAIL")
password = os.getenv("USER_PASS")

res = requests.post("http://localhost:9000/auth/login", json={
    "email": email,
    "password": password
})

resp = requests.post(login_url, json=credentials)
if resp.status_code != 200:
    print("Error al loguearse:", resp.text)
    exit()

token = resp.json()["token"]
print("Token recibido:", token)
api_url = "http://localhost:9000/vids/videos"



headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.get(api_url, headers=headers)

if response.status_code != 200:
    print("Error al obtener videos:", response.status_code, response.text)
    exit()

videos = response.json()

if not videos:
    print("No hay videos para este usuario.")
else:
    latest_video = sorted(videos, key=lambda v: v['fecha'])[-1]
    video_url = latest_video['url']
    print("Descargando desde:", video_url)

    out_folder = "descargadas"
    os.makedirs(out_folder, exist_ok=True)
    destino = os.path.join(out_folder, f"{latest_video['id']}.mp4")

    urlretrieve(video_url, destino)
    print("Video guardado en:", destino)
