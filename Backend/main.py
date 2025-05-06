from fastapi import FastAPI
from database.conexiondb import Base, engine
from routes import estudiante

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.include_router(estudiante.router)



@app.get("/")
def read_root():
    return {"message": "API funcionando"}