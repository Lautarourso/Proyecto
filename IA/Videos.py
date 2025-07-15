
import os
from urllib.request import urlretrieve
from zipfile import ZipFile
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
from base64 import b64encode

# Carpeta local donde se guardarán
out_folder = "descargadas"
os.makedirs(out_folder, exist_ok=True)

# Imagenes
urls = [
    "https://www.lanacion.com.ar/resizer/v2/la-foto-del-sobreviviente-del-accidente-de-air-VSPPSIZL7FHNPLG6AVNRJKKRJM.jpg?auth=45a0f94415c44b900ab889449912a901cec8f95987f3bd2040fab3a729918813&width=880&height=586&quality=70&smart=true"
]

# Videos
video_url = "https://res.cloudinary.com/dep9eerzf/video/upload/v1752173734/tus_videos/rvzzudbttaikvihsipgl.mp4"
destino = os.path.join(out_folder, "video.mp4")
urlretrieve(video_url, destino)



for url in urls:
    # Eliminar parámetros de la URL (lo que está después de '?')
    clean_name = url.split("/")[-1].split("?")[0]  # solo el nombre sin parámetros
    destino = os.path.join(out_folder, clean_name)
    try:
        urlretrieve(url, destino)
        print("Descargada:", destino)
    except Exception as e:
        print("Error al descargar", url, ":", e)

# ————— PROCESAMIENTO Y VISUALIZACIÓN —————
for fname in os.listdir(out_folder):
    path = os.path.join(out_folder, fname)
    img = cv.imread(path, cv.IMREAD_COLOR)
    if img is None:
        print("No se pudo leer:", path)
        continue


img_rgb = img[:, :, ::-1]

# Mostrar con matplotlib
plt.figure(figsize=(8, 6))
plt.imshow(img_rgb)
plt.axis('off')
plt.title("Imagen procesada")
plt.show()


# Mostrar el video
cap = cv.VideoCapture("video.mp4")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    cv.imshow('Video', frame)
    if cv.waitKey(25) & 0xFF == ord('q'):
        break

cap.release()
cv.destroyAllWindows()