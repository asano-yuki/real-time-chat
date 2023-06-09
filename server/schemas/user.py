from pydantic import BaseModel


class UserInfo(BaseModel):
    id: int | None
    name: str | None

    class Config:
        orm_mode = True
