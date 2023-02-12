FROM python:3.9
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
ENV DEBUG  "True"
ENV FRONT_ENDPOINT "127.0.0.1"
COPY . .

EXPOSE 8000
CMD ["python","manage.py", "runserver", "0.0.0.0:8000"]
