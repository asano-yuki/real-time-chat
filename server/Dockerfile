FROM python:3.11.2
RUN apt-get update -qq && apt-get install -y vim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir --upgrade -r requirements.txt
CMD uvicorn api.main:app --reload --host 0.0.0.0 --port 3001