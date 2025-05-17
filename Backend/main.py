from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.conexiondb import Base, engine
from routes import estudiante

app = FastAPI()

# Configuración CORS
origins = [
    "http://localhost:5173",  # Frontend con Vite
    "http://127.0.0.1:5173",  # Alternativa localhost
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



@app.get("/")
def read_root():
    return {"message": "API funcionando"}


