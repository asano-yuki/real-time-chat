from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, user, websocket

app = FastAPI(openapi_url="/api/v1/openapi.json")

origins = ["http://localhost:3000", "ws://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(user.router)
app.include_router(websocket.router)
