from pydantic import BaseModel

# Esquemas de Estudiante
class EstudianteBase(BaseModel):
    codigo: str
    nombre: str
    edad: int
    carrera: str
    semestre: int
    ciudad: str

class EstudianteCreate(EstudianteBase):
    pass

class Estudiante(EstudianteBase):
    id: int

    class Config:
        from_attributes = True


# Esquemas de JugadaEstudiante
class JugadaEstudianteBase(BaseModel):
    repeticiones: int
    tiempo: float
    lanzamientos: int

class JugadaEstudianteCreate(JugadaEstudianteBase):
    id_estudiante: int

class JugadaEstudiante(JugadaEstudianteBase):
    id: int
    id_estudiante: int

    class Config:
        from_attributes = True


# Esquema combinado para registro completo
class RegistroCompleto(BaseModel):
    estudiante: EstudianteBase
    jugada: JugadaEstudianteBase
