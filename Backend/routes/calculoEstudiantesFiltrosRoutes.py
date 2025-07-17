from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from database.conexiondb import get_db
from repository import estudiante as repo_estudiante
from services.calculoEstudiantesFiltros import calcular_estadisticas_filtradas

router = APIRouter(
    prefix="/api/estadisticas",
    tags=["estadísticas"]
)

@router.get("/jugadas-filtradas", response_model=dict)
def obtener_estadisticas_jugadas_filtradas(
    edad: Optional[int] = None,
    carrera: Optional[str] = None,
    ciudad: Optional[str] = None,
    semestre: Optional[int] = None,
    db: Session = Depends(get_db)
):
    try:
        estudiantes_con_jugadas = repo_estudiante.obtenerEstudiantesConJugadas(db)
        jugadas = []

        for estudiante in estudiantes_con_jugadas:
            for jugada in estudiante.jugadas:
                jugada.estudiante = estudiante  # necesario para que los filtros funcionen
                jugadas.append(jugada)

        return calcular_estadisticas_filtradas(
            jugadas,
            edad=edad,
            carrera=carrera,
            ciudad=ciudad,
            semestre=semestre
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
