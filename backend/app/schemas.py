from pydantic import BaseModel
from typing import List, Optional

# --- User Schemas ---
class UserCreate(BaseModel):
    email: str
    password: str
    town: str
    first_name: str
    last_name: str
    store_name: str
class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    town: str
    first_name: str
    last_name: str
    store_name: str

    class Config:
        orm_mode = True

# --- Food Schemas ---
class FoodCreate(BaseModel):
    name: str
    price: str

class FoodOut(FoodCreate):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
