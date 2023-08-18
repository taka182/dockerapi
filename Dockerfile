FROM python:3.11.4

WORKDIR /app

RUN pip install --no-warn-script-location fastapi uvicorn sqlalchemy mysqlclient pydantic Jinja2 python-multipart

COPY ./app/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

COPY ./app /app

CMD ["/app/wait-for-it.sh", "db:3306", "--","uvicorn", "main:fast", "--host", "0.0.0.0", "--port", "8000"]