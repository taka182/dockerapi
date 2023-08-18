import models, schemas
from sqlalchemy.orm import Session

def get_posts(db: Session):
    return db.query(models.Post).all()

def create_post(db: Session, post: schemas.PostCreate):
    db_post = models.Post(
        title=post.title,
        description=post.description
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int):
    db_post = db.query(models.Post).filter(models.Post.post_id == post_id)
    db_post.delete()
    db.commit()
    return {'message': 'delete_post'}

def update_post(db: Session, post_id: int, post: schemas.PostUpdate):
    db_post = db.query(models.Post).filter(models.Post.post_id == post_id).first()
    if not db_post:
        return None
    for key, value in post:
        setattr(db_post, key, value)
    db.commit()
    db.refresh(db_post)
    return db_post