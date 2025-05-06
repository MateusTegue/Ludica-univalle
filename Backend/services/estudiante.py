import pandas as pd
from typing import List
from models.schemas import Estudiante

def calcular_estadisticas(estudiantes: List[Estudiante]):
    # Convertir a DataFrame
    data = {
        'edad': [e.edad for e in estudiantes],
        'semestre': [e.semestre for e in estudiantes]
    }
    df = pd.DataFrame(data)
    
    # Calcular estadísticas
    estadisticas = {
        'edad': {
            'media': df['edad'].mean(),
            'mediana': df['edad'].median(),
            'moda': df['edad'].mode().tolist(),
            'desviacion': df['edad'].std(),
            'varianza': df['edad'].var()
        },
        'semestre': {
            'media': df['semestre'].mean(),
            'mediana': df['semestre'].median(),
            'moda': df['semestre'].mode().tolist(),
            'desviacion': df['semestre'].std(),
            'varianza': df['semestre'].var()
        }
    }
    
    return estadisticas