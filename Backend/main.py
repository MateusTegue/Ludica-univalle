from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.conexiondb import Base, engine
from routes import estudiante
from routes.calculoEstudiantesFiltrosRoutes import router as filtros_router  # ✅ Import corregido

app = FastAPI()

# Configuración CORS
origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)


Base.metadata.create_all(bind=engine)

app.include_router(estudiante.router)
app.include_router(filtros_router)

# app.include_router(calculoEstudiantesFiltrosRoutes.router)



@app.get("/")
def read_root():
    return {"message": "API funcionando"}


