from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.conexiondb import get_db
from repository import estudiante as repo_estudiante
from services import estudiante as service_estudiante
from models.schemas import Estudiante, EstudianteCreate

router = APIRouter(
    prefix="/api",
    tags=["estudiantes"]
)

@router.post("/estudiantes/", response_model=Estudiante)
def crear_estudiante(estudiante: EstudianteCreate, db: Session = Depends(get_db)):
    # Verificar si el código ya existe
    if repo_estudiante.obtenerEstudiantePorCodigo(db, estudiante.codigo):
        raise HTTPException(status_code=400, detail="El código de estudiante ya existe")
    return repo_estudiante.registroEstudiantes(db, estudiante)

@router.get("/estudiantes/", response_model=list[Estudiante])
def obtener_estudiantes(db: Session = Depends(get_db)):
    estudiantes = repo_estudiante.obtenerEstudiantes(db)
    return estudiantes

@router.get("/estadisticas/estudiantes/", response_model=dict)
def obtener_estadisticas(db: Session = Depends(get_db)):
    estudiantes = repo_estudiante.obtenerEstudiantes(db)
    return service_estudiante.calcular_estadisticas(estudiantes)