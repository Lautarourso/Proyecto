import requests
import os
from urllib.request import urlretrieve
from dotenv import load_dotenv

# Obtener el token de autenticación para logearse, y descargar el video

load_dotenv()


login_url = "https://proyecto-zvzl.onrender.com/auth/login"
api_url = "https://proyecto-zvzl.onrender.com/vids/videos"

email = os.getenv("USER_EMAIL")
password = os.getenv("USER_PASS")

resp = requests.post(login_url, json={
    "email": email,
    "password": password
})



if resp.status_code != 200:
    print("Error al loguearse:", resp.text)
    exit()

token = resp.json()["token"]
print("Token recibido:", token)



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
    out_folder = "descargadas"
    os.makedirs(out_folder, exist_ok=True)
    
    for video in videos:
        video_url = video['url']
        video_id = video['id']
        destino = os.path.join(out_folder, f"{video_id}.mp4")
        
        print(f"Descargando video ID {video_id} desde {video_url}")
        urlretrieve(video_url, destino)
        print(f"Video ID {video_id} guardado en: {destino}")

print("Descarga de todos los videos completada.")