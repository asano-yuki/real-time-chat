from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import relationship
from api.db import Base
from datetime import datetime


class Room(Base):
    __tablename__ = "room"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(
        DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False
    )
    chat = relationship("Chat", back_populates="room")
