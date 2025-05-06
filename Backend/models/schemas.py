# models/schemas.py
from pydantic import BaseModel

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