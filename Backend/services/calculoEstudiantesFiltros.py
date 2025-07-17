# import pandas as pd
# from typing import List, Optional
# from models.schemas import JugadaEstudiante

# def calcular_estadisticas_filtradas(
#     jugadas: List[JugadaEstudiante],
#     edad: Optional[int] = None,
#     carrera: Optional[str] = None,
#     ciudad: Optional[str] = None,
#     semestre: Optional[int] = None
# ):
#     data = {
#         'repeticiones': [j.repeticiones for j in jugadas],
#         'tiempo': [j.tiempo for j in jugadas],
#         'lanzamientos': [j.lanzamientos for j in jugadas],
#         'edad': [j.estudiante.edad for j in jugadas],
#         'carrera': [j.estudiante.carrera for j in jugadas],
#         'ciudad': [j.estudiante.ciudad for j in jugadas],
#         'semestre': [j.estudiante.semestre for j in jugadas],
#     }
#     df = pd.DataFrame(data)

#     if edad is not None:
#         df = df[df['edad'] == edad]
#     if carrera is not None:
#         df = df[df['carrera'] == carrera]
#     if ciudad is not None:
#         df = df[df['ciudad'] == ciudad]
#     if semestre is not None:
#         df = df[df['semestre'] == semestre]

#     estadisticas = {
#         'repeticiones': {
#             'media': df['repeticiones'].mean(),
#             'mediana': df['repeticiones'].median(),
#             'moda': df['repeticiones'].mode().tolist(),
#             'desviacion': df['repeticiones'].std(),
#             'varianza': df['repeticiones'].var()
#         },
#         'tiempo': {
#             'media': df['tiempo'].mean(),
#             'mediana': df['tiempo'].median(),
#             'moda': df['tiempo'].mode().tolist(),
#             'desviacion': df['tiempo'].std(),
#             'varianza': df['tiempo'].var()
#         },
#         'lanzamientos': {
#             'media': df['lanzamientos'].mean(),
#             'mediana': df['lanzamientos'].median(),
#             'moda': df['lanzamientos'].mode().tolist(),
#             'desviacion': df['lanzamientos'].std(),
#             'varianza': df['lanzamientos'].var()
#         }
#     }

#     return estadisticas

import pandas as pd
from typing import List, Optional
from models.schemas import JugadaEstudiante

def calcular_moda(columna):
    modas = columna.mode()
    frecuencia = columna.value_counts()
    modas_validas = [m for m in modas if frecuencia[m] > 1]
    return modas_validas if modas_validas else None

def calcular_estadisticas_filtradas(
    jugadas: List[JugadaEstudiante],
    edad: Optional[int] = None,
    carrera: Optional[str] = None,
    ciudad: Optional[str] = None,
    semestre: Optional[int] = None
):
    data = {
        'repeticiones': [j.repeticiones for j in jugadas],
        'tiempo': [j.tiempo for j in jugadas],
        'lanzamientos': [j.lanzamientos for j in jugadas],
        'edad': [j.estudiante.edad for j in jugadas],
        'carrera': [j.estudiante.carrera for j in jugadas],
        'ciudad': [j.estudiante.ciudad for j in jugadas],
        'semestre': [j.estudiante.semestre for j in jugadas],
    }
    
    df = pd.DataFrame(data)

    # Aplicar filtros
    if edad is not None:
        df = df[df['edad'] == edad]
    if carrera is not None:
        df = df[df['carrera'] == carrera]
    if ciudad is not None:
        df = df[df['ciudad'] == ciudad]
    if semestre is not None:
        df = df[df['semestre'] == semestre]

    estadisticas = {
        'repeticiones': {
            'media': df['repeticiones'].mean(),
            'mediana': df['repeticiones'].median(),
            'moda': calcular_moda(df['repeticiones']),
            'desviacion': df['repeticiones'].std(),
            'varianza': df['repeticiones'].var()
        },
        'tiempo': {
            'media': df['tiempo'].mean(),
            'mediana': df['tiempo'].median(),
            'moda': calcular_moda(df['tiempo']),
            'desviacion': df['tiempo'].std(),
            'varianza': df['tiempo'].var()
        },
        'lanzamientos': {
            'media': df['lanzamientos'].mean(),
            'mediana': df['lanzamientos'].median(),
            'moda': calcular_moda(df['lanzamientos']),
            'desviacion': df['lanzamientos'].std(),
            'varianza': df['lanzamientos'].var()
        }
    }

    return estadisticas
