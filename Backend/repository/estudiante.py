from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.estudiante import Estudiante as EstudianteModel
from models.schemas import EstudianteCreate
from models.estudiante import Estudiante as EstudianteModel, JugadaEstudiante as JugadaModel
from models.schemas import RegistroCompleto

def registroCompleto(db: Session, datos: RegistroCompleto):
    # Verificar si el código ya existe (forma simple)
    if db.query(EstudianteModel).filter(EstudianteModel.codigo == datos.estudiante.codigo).first():
        raise HTTPException(status_code=400, detail="El código ya existe")

    # Crear estudiante
    nuevo_estudiante = EstudianteModel(
        codigo=datos.estudiante.codigo,
        nombre=datos.estudiante.nombre,
        edad=datos.estudiante.edad,
        carrera=datos.estudiante.carrera,
        semestre=datos.estudiante.semestre,
        ciudad=datos.estudiante.ciudad
    )
    db.add(nuevo_estudiante)
    db.commit()
    db.refresh(nuevo_estudiante)

    # Crear jugada
    nueva_jugada = JugadaModel(
        id_estudiante=nuevo_estudiante.id,
        repeticiones=datos.jugada.repeticiones,
        tiempo=datos.jugada.tiempo,
        lanzamientos=datos.jugada.lanzamientos
    )
    db.add(nueva_jugada)
    db.commit()
    db.refresh(nueva_jugada)

    # Convertir a diccionarios simples
    return {
        "estudiante": {
            "id": nuevo_estudiante.id,
            "codigo": nuevo_estudiante.codigo,
            "nombre": nuevo_estudiante.nombre,
            "edad": nuevo_estudiante.edad,
            "carrera": nuevo_estudiante.carrera,
            "semestre": nuevo_estudiante.semestre,
            "ciudad": nuevo_estudiante.ciudad
        },
        "jugada": {
            "id": nueva_jugada.id,
            "id_estudiante": nueva_jugada.id_estudiante,
            "repeticiones": nueva_jugada.repeticiones,
            "tiempo": nueva_jugada.tiempo,
            "lanzamientos": nueva_jugada.lanzamientos
        }
    }

def obtener_registros_completos(db: Session):
    resultados = db.query(EstudianteModel, JugadaModel).join(JugadaModel).all()
    
    registros = []
    for estudiante, jugada in resultados:
        registros.append({
            "estudiante": {
                "id": estudiante.id,
                "codigo": estudiante.codigo,
                "nombre": estudiante.nombre,
                "edad": estudiante.edad,
                "carrera": estudiante.carrera,
                "semestre": estudiante.semestre,
                "ciudad": estudiante.ciudad
            },
            "jugada": {
                "id": jugada.id,
                "id_estudiante": jugada.id_estudiante,
                "repeticiones": jugada.repeticiones,
                "tiempo": jugada.tiempo,
                "lanzamientos": jugada.lanzamientos
            }
        })
    
    return registros

def eliminar_registro_completo(db: Session, estudiante_id: int):
    estudiante = db.query(EstudianteModel).filter(EstudianteModel.id == estudiante_id).first()
    
    if not estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")

    # Eliminar jugadas relacionadas
    db.query(JugadaModel).filter(JugadaModel.id_estudiante == estudiante_id).delete()

    # Eliminar estudiante
    db.delete(estudiante)
    db.commit()

    return {"mensaje": "Registro eliminado correctamente"}





def obtenerEstudiantesConJugadas(db: Session):
    return db.query(EstudianteModel).join(EstudianteModel.jugadas).all()


