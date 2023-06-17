import React, { useState } from 'react'
import { ChatModal } from './components/ChatModal'
import Styled from 'styled-components'

export const App = () => {
  const [showModal, setShowModal] = useState(false)

  const handleEnterRoom = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <StyledContainer>
        <StyledTitle>チャットアプリ</StyledTitle>
        <StyledEnterBtn disabled={showModal} onClick={handleEnterRoom}>
          入室
        </StyledEnterBtn>
      </StyledContainer>
      <ChatModal showModal={showModal} onClose={handleCloseModal} />
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
