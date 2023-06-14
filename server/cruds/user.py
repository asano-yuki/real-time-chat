from fastapi.responses import JSONResponse
from api.db import get_db
from models.user import User
from schemas.user import UserInfo


def get_user_info(user_id: int, db=get_db()) -> UserInfo | None:
    data = db.get(User, user_id)
    return data if data else JSONResponse(content=None)


def create_user(user_name: str, db=get_db()) -> UserInfo:
    user = User()
    user.name = user_name
    db.add(user)
    db.commit()
    return UserInfo(id=user.id, name=user.name)
