import os
import pathlib
import random
import numpy as np
import matplotlib.pyplot as plt

import zipfile
import requests
import glob as glob

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Dropout, Flatten
from tensorflow.keras.utils import image_dataset_from_directory

from matplotlib.ticker import MultipleLocator, FormatStrFormatter
from dataclasses import dataclass

from zipfile import ZipFile
from urllib.request import urlretrieve

from tensorflow.keras.applications import EfficientNetB0


SEED_VALUE = 41

random.seed(SEED_VALUE)
np.random.seed(SEED_VALUE)
tf.random.set_seed(SEED_VALUE)


#@dataclass(frozen=True)
class DatasetConfig:
    NUM_CLASSES: int = 43
    IMG_HEIGHT:  int = 224
    IMG_WIDTH:   int = 224
    CHANNELS:    int = 3
    DATA_ROOT_TRAIN: str = "C:\Users\Administrador\Downloads\Proyecto-nuevo-proyecto\Proyecto\IA\Dataset\Train_Dataset"
    DATA_ROOT_VALID: str =  "C:\Users\Administrador\Downloads\Proyecto-nuevo-proyecto\Proyecto\IA\Dataset\Validation_Dataset"

#@dataclass(frozen=True)
class TrainingConfig:
    BATCH_SIZE:       int   = 32
    EPOCHS:           int   = 101
    LEARNING_RATE:    float = 0.0001
    DROPOUT:          float = 0.6
    LAYERS_FINE_TUNE: int   = 8 


train_dataset = image_dataset_from_directory(directory=DatasetConfig.DATA_ROOT_TRAIN,
                                             batch_size=TrainingConfig.BATCH_SIZE,
                                             shuffle=True,
                                             seed=SEED_VALUE,
                                             label_mode='int', # integer encoding (No One-Hot)
                                             image_size=(DatasetConfig.IMG_HEIGHT, DatasetConfig.IMG_WIDTH),
                                            )

valid_dataset = image_dataset_from_directory(directory=DatasetConfig.DATA_ROOT_VALID,
                                             batch_size=TrainingConfig.BATCH_SIZE,
                                             shuffle=True,
                                             seed=SEED_VALUE,
                                             label_mode='int', 
                                             image_size=(DatasetConfig.IMG_HEIGHT, DatasetConfig.IMG_WIDTH),
                                            )


input_shape = (DatasetConfig.IMG_HEIGHT, DatasetConfig.IMG_WIDTH, DatasetConfig.CHANNELS)
modelo_base = tf.keras.applications.EfficientNetB0(
    input_shape=input_shape, 
    include_top=False,  
    weights='imagenet'
)

modelo_base.trainable = True

num_layers_fine_tune = TrainingConfig.LAYERS_FINE_TUNE
num_layers = len(modelo_base)

for model_layer in modelo_base[: num_layers - num_layers_fine_tune]:
    print(f"Frizando las capas: {model_layer}")
    model_layer.trainable = False

print("\n")
print(f"Configurado para poder modificar las últimas {num_layers_fine_tune} capas convolucionales")
print("\n")

modelo_base.summary()

inputs = tf.keras.Input(shape=input_shape)

x = tf.keras.applications.EfficientNetB0.preprocess_input(inputs)

x = modelo_base(x)

x = layers.Flatten()(x)

x = layers.Dense(128, activation="relu")(x)
x = layers.Dropout(TrainingConfig.DROPOUT)(x)

outputs = layers.Dense(DatasetConfig.NUM_CLASSES, activation="softmax")(x)

modelo_con_ft = keras.Model(inputs, outputs)

modelo_con_ft.summary()


modelo_con_ft.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=TrainingConfig.LEARNING_RATE),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
    metrics=["accuracy"],
)


resultados_entrenamiento = modelo_con_ft.fit(train_dataset, epochs=TrainingConfig.EPOCHS, validation_data=valid_dataset)