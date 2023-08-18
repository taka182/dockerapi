from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from database import Base

class Post(Base):
    __tablename__ = "post"
    post_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String(128), index=True)
    description = Column(String(128), index=True)
    created_at = Column(DateTime, default= func.now())
    updated_at = Column(DateTime)