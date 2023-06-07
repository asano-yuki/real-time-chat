from fastapi import Depends
from typing import List
from sqlalchemy.orm import Session
from api.db import get_db
import models.chat as chat_models
import models.user as user_models
import schemas.chat as chat_schemas

def get_chats(chat_id: int, db: Session = Depends(get_db)) -> List[chat_schemas.Chat]:
    return (
      db.query(chat_models.Chat)
        .join(user_models.User)
        .filter(chat_models.Chat.id==chat_id)
        .all()
    )