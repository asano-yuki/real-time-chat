from typing import List
from fastapi import APIRouter
from cruds.chat import get_chat_info
import schemas.chat as chat_schemas

router = APIRouter()


@router.get("/chat/{room_id}", response_model=List[chat_schemas.Chat])
async def list_chats(room_id: int):
    return get_chat_info(room_id)
