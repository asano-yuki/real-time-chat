from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base
from datetime import datetime


class Chat(Base):
    __tablename__ = "chat"
    id = Column(Integer, primary_key=True, autoincrement=True)
    room_id = Column(Integer, ForeignKey("room.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    message = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(
        DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False
    )
    room = relationship("Room", back_populates="chat")
    user = relationship("User", back_populates="chat")
