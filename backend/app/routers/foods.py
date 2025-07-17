from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from .. import database, models, schemas
from jose import jwt, JWTError
import os
from typing import List

router = APIRouter(prefix="/foods", tags=["Foods"])
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def get_user_id(token: str = Header(...)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/", response_model=schemas.FoodOut)
def add_food(food: schemas.FoodCreate, user_id: int = Depends(get_user_id), db: Session = Depends(database.SessionLocal)):
    new_food = models.Food(**food.dict(), owner_id=user_id)
    db.add(new_food)
    db.commit()
    db.refresh(new_food)
    return new_food

@router.get("/", response_model=List[schemas.FoodOut])
def get_user_foods(user_id: int = Depends(get_user_id), db: Session = Depends(database.SessionLocal)):
    return db.query(models.Food).filter(models.Food.owner_id == user_id).all()
