from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.conexiondb import get_db
from repository import estudiante as repo_estudiante
from services import estudiante as service_estudiante
from models.schemas import Estudiante, EstudianteCreate, RegistroCompleto, JugadaEstudiante

router = APIRouter(
    prefix="/api",
    tags=["estudiantes"]
)

@router.post("/registro-completo/")
def registro_completo(datos: RegistroCompleto, db: Session = Depends(get_db)):
    try:
        return repo_estudiante.registroCompleto(db, datos)
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/registro-completo/")
def listar_registros_completos(db: Session = Depends(get_db)):
    return repo_estudiante.obtener_registros_completos(db)


@router.delete("/registro-completo/{estudiante_id}")
def eliminar_registro(estudiante_id: int, db: Session = Depends(get_db)):
    return repo_estudiante.eliminar_registro_completo(db, estudiante_id)



@router.get("/estadisticas/jugadas/", response_model=dict)
def obtener_estadisticas_jugadas(db: Session = Depends(get_db)):
    estudiantes_con_jugadas = repo_estudiante.obtenerEstudiantesConJugadas(db)
    jugadas = []
    for estudiante in estudiantes_con_jugadas:
        jugadas.extend(estudiante.jugadas)
    return service_estudiante.calcular_estadisticas_jugadas(jugadas)






