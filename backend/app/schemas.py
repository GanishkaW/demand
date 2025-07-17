from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str
    town: str  

class UserOut(BaseModel):
    id: int
    email: str
    town: str  

    class Config:
        orm_mode = True

class FoodCreate(BaseModel):
    name: str
    price: float
    ingredients: str

class FoodOut(FoodCreate):
    id: int
    owner_id: int
    class Config:
        orm_mode = True
