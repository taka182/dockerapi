from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import func
from typing import Optional

class PostBase(BaseModel):
    title: str
    description: str

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    updated_at: datetime = func.now()

class Post(PostBase):
    post_id: int
    created_at: datetime = func.now()
    updated_at: Optional[datetime] = func.now()

    class Config:
        orm_mode = True