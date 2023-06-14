import React, { useState, useCallback } from 'react'
import { ChatModal } from './components/ChatModal'
import Styled from 'styled-components'

export const App = () => {
  const [showModal, setShowModal] = useState(false)

  const handleEnterRoom = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleLeaveRoom = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <>
      <StyledContainer>
        <StyledTitle>チャットアプリ</StyledTitle>
        <StyledParticipants>
          参加者
          <StyledParticipantsNum>2/5</StyledParticipantsNum>
        </StyledParticipants>
        <StyledEnterBtn disabled={showModal} onClick={handleEnterRoom}>
          入室
        </StyledEnterBtn>
      </StyledContainer>
      <ChatModal showModal={showModal} handleLeaveRoom={handleLeaveRoom} />
    </>
  )
}

const StyledContainer = Styled.div`
  width: 500px;
  margin: 20px auto;
  text-align: center;
`

const StyledTitle = Styled.h1`  
  font-size: 20px;
  color: #5f5f5f;
`

const StyledParticipants = Styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #5f5f5f;
`

const StyledParticipantsNum = Styled.span`
  display: block;
  margin-top: 2px;
  font-size: 12px;
`

const StyledEnterBtn = Styled.button`
  width: 120px;
  margin-top: 8px;
  padding: 8px;
  line-height: 1.5;
  color: #fff;     
  background: #698fe1;
  box-shadow: 2px 2px 5px #b5b5b5;
  border: none;
  border-radius: 4px;   
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`
