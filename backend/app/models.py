from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    town = Column(String)
    
    # ✅ Add these new fields
    first_name = Column(String)
    last_name = Column(String)
    store_name = Column(String)

    foods = relationship("Food", back_populates="owner")

class Food(Base):
    __tablename__ = 'foods'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Float)
    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="foods")
