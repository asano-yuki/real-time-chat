import React, { useRef, useCallback, useEffect } from 'react'
import Draggable from 'react-draggable'
import { useUser } from '../../hooks/useUser'
import { useWebSocket } from '../../hooks/useWebSocket'
import { Login } from '../Login'
import { EnteredRoom } from '../EnteredRoom'
import Styled from 'styled-components'

interface Props {
  showModal: boolean
  onClose: () => void
}

export const ChatModal = ({ showModal, onClose }: Props) => {
  const nodeRef = useRef(null)

  const { user, createUser, deleteUser } = useUser()
  const { messageInfos, isOpenWebSocket, openWebSocket, closeWebSocket, sendMessage, resetMessageList } = useWebSocket()

  const handleLogin = useCallback(
    async (userName: string) => {
      const { id } = await createUser(userName)
      sendMessage({ action: 'join', id, userName })
    },
    [createUser, sendMessage]
  )

  const handleSendMessage = (message: string) => {
    if (!user) return
    const data = { id: user.id, userName: user.name, message }
    sendMessage({ action: 'sendMessage', ...data })
  }

  const handleClose = () => {
    onClose()
    if (!user) return
    const data = { id: user.id, userName: user.name }
    sendMessage({ action: 'exit', ...data })
    closeWebSocket()
    deleteUser()
    resetMessageList()
  }

  // モーダル起動時にWebSocket開始
  useEffect(() => {
    if (showModal && !isOpenWebSocket) openWebSocket()
  }, [showModal, isOpenWebSocket, openWebSocket])

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
          <StyledClose onClick={handleClose}>✖️</StyledClose>
        </StyledHeader>
        {user ? (
          <EnteredRoom user={user} messageInfos={messageInfos} onSendMessage={handleSendMessage} />
        ) : (
          <Login onLogin={handleLogin} />
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
