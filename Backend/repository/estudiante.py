from sqlalchemy.orm import Session
from models.estudiante import Estudiante as EstudianteModel
from models.schemas import EstudianteCreate

def registroEstudiantes(db: Session, estudiante: EstudianteCreate):
    nuevo_estudiante = EstudianteModel(
        codigo=estudiante.codigo,
        nombre=estudiante.nombre,
        edad=estudiante.edad,
        carrera=estudiante.carrera,
        semestre=estudiante.semestre,
        ciudad=estudiante.ciudad
    )
    db.add(nuevo_estudiante)
    db.commit()
    db.refresh(nuevo_estudiante)
    return nuevo_estudiante

def obtenerEstudiantes(db: Session):
    return db.query(EstudianteModel).all()

def obtenerEstudiantePorCodigo(db: Session, codigo: str):
    return db.query(EstudianteModel).filter(EstudianteModel.codigo == codigo).first()

def actualizarEstudiante(db: Session, id: int, estudiante: EstudianteCreate):
    db_estudiante = db.query(EstudianteModel).filter(EstudianteModel.id == id).first()
    if db_estudiante:
        for key, value in estudiante.dict().items():
            setattr(db_estudiante, key, value)
        db.commit()
        db.refresh(db_estudiante)
    return db_estudiante
    
def eliminarEstudiante(db: Session, id: int):
    estudiante = db.query(EstudianteModel).filter(EstudianteModel.id == id).first()
    if estudiante:
        db.delete(estudiante)
        db.commit()
        return True
    return False