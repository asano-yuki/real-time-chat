from typing import List
from fastapi import APIRouter
from cruds.chat import get_chat_info
from schemas.chat import Chat

router = APIRouter()


@router.get("/chat/{room_id}", response_model=List[Chat])
async def list_chats(room_id: int):
    return get_chat_info(room_id)
