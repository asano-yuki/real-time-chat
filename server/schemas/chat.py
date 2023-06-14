from pydantic import BaseModel


class Chat(BaseModel):
    id: int
    room_id: int
    room_name: str
    user_id: int
    user_name: str
    message: str


class UserJoin(BaseModel):
    id: int
    user_name: str


class MessageCreate(BaseModel):
    id: int
    user_id: int
    message: str
