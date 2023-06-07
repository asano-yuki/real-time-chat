from pydantic import BaseModel

class Chat(BaseModel):
    id: int
    user_id: int
    user_name: str
    message: str

class RoomCreate(BaseModel):
    user_name: str

class UserJoin(BaseModel):
    id: int
    user_name: str

class MessageCreate(BaseModel):
    id: int
    user_id: int
    message: str