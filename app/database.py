from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

user = "admin"
password = "innovator"
host = "mysql"
port = "3306"
db_name = "Post"
DATABASE_URL = f"mysql://{user}:{password}@{host}:{port}/{db_name}"

# 接続を開始する処理
ENGINE = create_engine(
    DATABASE_URL
)

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = ENGINE)

Base = declarative_base()