import pandas as pd
from typing import List
from models.schemas import JugadaEstudiante

def calcular_moda_si_repite(serie: pd.Series):
    moda = serie.mode()
    value_counts = serie.value_counts()
    if value_counts.empty or value_counts.iloc[0] == 1:
        return None
    return moda.tolist()

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
            'moda': calcular_moda_si_repite(df['repeticiones']),
            'desviacion': df['repeticiones'].std(),
            'varianza': df['repeticiones'].var()
        },
        'tiempo': {
            'media': df['tiempo'].mean(),
            'mediana': df['tiempo'].median(),
            'moda': calcular_moda_si_repite(df['tiempo']),
            'desviacion': df['tiempo'].std(),
            'varianza': df['tiempo'].var()
        },
        'lanzamientos': {
            'media': df['lanzamientos'].mean(),
            'mediana': df['lanzamientos'].median(),
            'moda': calcular_moda_si_repite(df['lanzamientos']),
            'desviacion': df['lanzamientos'].std(),
            'varianza': df['lanzamientos'].var()
        }
    }

    return estadisticas
