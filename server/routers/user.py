from fastapi import APIRouter
import schemas.user as user_schemas
from cruds.user import get_user_info

router = APIRouter()


@router.get("/user/{user_id}", response_model=user_schemas.UserInfo)
async def user_info(user_id: int):
    return get_user_info(user_id)
