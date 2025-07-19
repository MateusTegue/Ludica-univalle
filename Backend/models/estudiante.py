from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from database.conexiondb import Base

class Estudiante(Base):
    __tablename__ = 'estudiante'

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), unique=False, nullable=False)
    nombre = Column(String(50), nullable=False)
    edad = Column(Integer, nullable=False)
    carrera = Column(String(50), nullable=False)
    semestre = Column(Integer, nullable=False)
    ciudad = Column(String(50), nullable=False)

    jugadas = relationship("JugadaEstudiante", back_populates="estudiante")

class JugadaEstudiante(Base):
    __tablename__ = 'jugada_estudiante'

    id = Column(Integer, primary_key=True, index=True)
    id_estudiante = Column(Integer, ForeignKey('estudiante.id'), nullable=False)
    repeticiones = Column(Integer, nullable=False)
    tiempo = Column(Float, nullable=False)
    lanzamientos = Column(Integer, nullable=False)

    estudiante = relationship("Estudiante", back_populates="jugadas")
