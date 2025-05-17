import pandas as pd
from typing import List
from models.schemas import JugadaEstudiante

def calcular_estadisticas_jugadas(jugadas: List[JugadaEstudiante]):
    data = {
        'repeticiones': [j.repeticiones for j in jugadas],
        'tiempo': [j.tiempo for j in jugadas],
        'lanzamientos': [j.lanzamientos for j in jugadas]
    }
    df = pd.DataFrame(data)

    estadisticas = {
        'repeticiones': {
            'media': df['repeticiones'].mean(),
            'mediana': df['repeticiones'].median(),
            'moda': df['repeticiones'].mode().tolist(),
            'desviacion': df['repeticiones'].std(),
            'varianza': df['repeticiones'].var()
        },
        'tiempo': {
            'media': df['tiempo'].mean(),
            'mediana': df['tiempo'].median(),
            'moda': df['tiempo'].mode().tolist(),
            'desviacion': df['tiempo'].std(),
            'varianza': df['tiempo'].var()
        },
        'lanzamientos': {
            'media': df['lanzamientos'].mean(),
            'mediana': df['lanzamientos'].median(),
            'moda': df['lanzamientos'].mode().tolist(),
            'desviacion': df['lanzamientos'].std(),
            'varianza': df['lanzamientos'].var()
        }
    }

    return estadisticas
