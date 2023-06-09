from typing import Any
from sqlalchemy.orm import Session
from api.db import get_db
from models.chat import Chat
from models.user import User
from models.room import Room
import schemas.chat as chat_schemas


def get_chat_info(room_id: int, db: Session = get_db()) -> list[chat_schemas.Chat]:
    data = (
        db.query(
            Chat.id,
            Chat.room_id,
            Room.name.label("room_name"),
            Chat.user_id,
            User.name.label("user_name"),
            Chat.message,
        )
        .filter(Chat.room_id == room_id)
        .outerjoin(User, Chat.user_id == User.id)
        .outerjoin(Room, Chat.room_id == Room.id)
    )
    res: list[chat_schemas.Chat] = []
    for row in data:
        res.append(
            chat_schemas.Chat(
                id=row.id,
                room_id=row.room_id,
                room_name=row.room_name,
                user_id=row.user_id,
                user_name=row.user_name,
                message=row.message,
            )
        )
    return res
