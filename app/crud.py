import models, schemas
from sqlalchemy.orm import Session

# 最後の投稿ID(post_id)から降順で100件の投稿データを取得
def get_posts(db: Session):
    return db.query(models.Post).order_by(models.Post.post_id.desc()).limit(100).all()

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