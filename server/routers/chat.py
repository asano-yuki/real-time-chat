from typing import List
from fastapi import APIRouter
from cruds.chat import get_chats
import schemas.chat as chat_schema

router = APIRouter()

@router.get("/chat/{chat_id}", response_model=List[chat_schema.Chat])
async def list_chats(chat_id: int):
    return get_chats(chat_id)