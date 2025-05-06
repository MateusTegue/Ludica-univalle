from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.conexiondb import get_db
from routes.estudiante import router as estudiante_router

# Aquí puedes agregar lógica adicional si necesitas un controlador intermedio
# Pero con FastAPI normalmente las rutas son suficientes

router = APIRouter()
router.include_router(estudiante_router)