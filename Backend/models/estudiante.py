
from sqlalchemy import Column, Integer, Float, String
from database.conexiondb import Base

# Definición del modelo Estudiante
class Estudiante(Base):
    __tablename__ = 'estudiante'
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), unique=True, nullable=False)
    nombre = Column(String(50), nullable=False)
    edad = Column(Integer, nullable=False)
    carrera = Column(String(50), nullable=False)
    semestre = Column(Integer, nullable=False)  
    ciudad = Column(String(50), nullable=False)                          