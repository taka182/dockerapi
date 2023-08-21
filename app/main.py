# APIサーバーのメインファイル
# fastAPIをインポート(APIのすべての機能を提供する)
from database import SessionLocal, ENGINE
from fastapi import FastAPI, Depends, Request, Form, Body
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
import crud, models, schemas
from fastapi.responses import RedirectResponse



# FastAPIのインスタンスを生成
# テーブル作成
models.Base.metadata.create_all(bind=ENGINE)
fast = FastAPI()

fast.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# すべてのpost取得
@fast.get("/posts/")
def read_posts(request: Request, db: SessionLocal = Depends(get_db)
):
    read_posts = crud.get_posts(db)
    return templates.TemplateResponse("index.html", {"request": request, "posts": read_posts})

# 投稿画面フォーム取得
@fast.get("/create_posts/")
def create_post_form(request: Request):
    return templates.TemplateResponse("create.html", {"request": request})

# post作成
@fast.post("/create_posts/")
def create_post(
    title: str = Form(...), description: str = Form(...), db: SessionLocal = Depends(get_db)
):
    post = schemas.PostCreate(title=title, description=description)
    crud.create_post(db=db, post=post)
    return RedirectResponse(url='/posts/', status_code=303)

# post削除
@fast.delete("/posts/{post_id}/")
def delete_post(post_id: int , db: SessionLocal = Depends(get_db)):
    delete_post = crud.delete_post(db, post_id=post_id)
    if delete_post:
        return {"status": "success"}

# post更新
@fast.put("/posts/{post_id}/")
def update_post(post_id: int, post: schemas.PostUpdate = Body(...), db: SessionLocal = Depends(get_db)):
    update_post = crud.update_post(db, post_id, post)
    if update_post:
        return {"status": "success"}