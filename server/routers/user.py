from fastapi import APIRouter
from schemas.user import UserInfo, UserCreate
from cruds.user import get_user_info, create_user

router = APIRouter()


@router.get("/user/{user_id}", response_model=UserInfo)
async def user_info(user_id: int):
    return get_user_info(user_id)


@router.post("/user/create", response_model=UserInfo)
async def user_create(user: UserCreate):
    return create_user(user.name)
