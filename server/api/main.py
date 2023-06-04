from fastapi import FastAPI

from routers import task, done

app = FastAPI(openapi_url="/api/v1/openapi.json")

app.include_router(task.router)
app.include_router(done.router)

@app.get('/')
async def hello():
  return {"message": "hello world!"}
