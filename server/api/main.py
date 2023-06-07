from fastapi import FastAPI

from routers import chat

app = FastAPI(openapi_url="/api/v1/openapi.json")

app.include_router(chat.router)
