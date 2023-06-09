from fastapi.responses import JSONResponse
from api.db import get_db
from models.user import User
import schemas.user as user_schemas


def get_user_info(user_id: int, db=get_db()) -> user_schemas.UserInfo | None:
    data = db.get(User, user_id)
    return data if data else JSONResponse(content=None)
