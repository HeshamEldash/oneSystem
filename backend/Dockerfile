FROM python:3.9.6-alpine
WORKDIR /app

ENV DEBUG  "True"
ENV FRONT_ENDPOINT "127.0.0.1"
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
# CMD ["gunicorn", "oneSystem_core.wsgi:application" ]

# CMD ["gunicorn", "oneSystem_core.wsgi:application" , "--bind", "0.0.0.0:8000"]

CMD ["python","manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]