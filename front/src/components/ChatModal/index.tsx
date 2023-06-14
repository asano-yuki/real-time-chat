import React, { useRef, useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import Draggable from 'react-draggable'
import { Login } from '../Login'
import { EnteredRoom, MessageInfo } from '../EnteredRoom'
import type { UserResponse } from '../../types/user'
import type { ChatResponse } from '../../types/chat'
import Styled from 'styled-components'

interface Props {
  showModal: boolean
  handleLeaveRoom: () => void
}

export const ChatModal = ({ showModal, handleLeaveRoom }: Props) => {
  const nodeRef = useRef(null)

  const [user, setUser] = useState<UserResponse>()
  const [messageList, setMessageList] = useState<MessageInfo[]>([])

  const createUser = useCallback(async (userName: string) => {
    const res = await axios.post<UserResponse>('http://localhost:3001/user/create', {
      name: userName
    })
    setUser(res.data)
  }, [])

  const addMessage = useCallback(
    (message: string) => {
      if (!user) return
      setMessageList((prev) => [
        ...prev,
        {
          id: user.id,
          userName: user.name,
          message
        }
      ])
    },
    [user]
  )

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const res = await axios.get<ChatResponse[]>('http://localhost:3001/chat/1')
      setMessageList(
        res.data.map(({ id, user_name, message }) => ({
          id,
          userName: user_name,
          message
        }))
      )
    })()
  }, [user])

  if (!showModal) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      axis='both'
      handle='.header'
      defaultPosition={{ x: 200, y: 0 }}
      grid={[5, 5]}
      scale={1}
    >
      <StyledContainer ref={nodeRef}>
        <StyledHeader className='header'>
          <StyledTitle>チャット</StyledTitle>
          <StyledClose onClick={handleLeaveRoom}>✖️</StyledClose>
        </StyledHeader>
        {user ? (
          <EnteredRoom user={user} messageList={messageList} addMessage={addMessage} />
        ) : (
          <Login createUser={createUser} />
        )}
      </StyledContainer>
    </Draggable>
  )
}

const StyledContainer = Styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 600px;
  background: #fff;
  box-shadow: 2px 2px 7px #d0d0d0;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  user-select: none;
  z-index: 2;
`

const StyledHeader = Styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 8px 0;
  color: #5f5f5f;
  border-bottom: 1px solid #dfdfdf;
  cursor: move;
`

const StyledTitle = Styled.h2`
  width: 100%;
  padding-left: 28px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
`

const StyledClose = Styled.span`
  margin-right: 8px;
  margin-left: auto;
  font-size: 14px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`
