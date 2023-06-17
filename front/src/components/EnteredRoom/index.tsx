import React, { useState, useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { Message } from '../Message'
import type { ChangeEvent } from 'react'
import type { UserResponse } from '../../types/user'
import type { MessageInfo } from '../../hooks/useWebSocket'
import styled, { css } from 'styled-components'

interface Props {
  user: UserResponse
  messageInfos: MessageInfo[]
  onSendMessage: (message: string) => void
}

export const EnteredRoom = ({ user, messageInfos, onSendMessage }: Props) => {
  const [message, setMessage] = useState('')

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleClickSendBtn = () => {
    onSendMessage(message.trim())
    setMessage('')
  }

  useEffect(() => {
    scroll.scrollToBottom({
      containerId: 'message-list',
      duration: 300
    })
  }, [messageInfos])

  return (
    <>
      <StyledMessageList id='message-list'>
        {messageInfos.map(({ id, userName, message = '' }, index) => (
          <StyledMessageItem key={index} direction={user.id === id ? 'right' : 'left'}>
            <Message name={user.id === id ? undefined : userName} text={message} />
          </StyledMessageItem>
        ))}
      </StyledMessageList>
      <StyledFooter>
        <StyledUserName>ユーザー名: {user.name}</StyledUserName>
        <StyledMessageTextarea name='message' maxLength={50} value={message} onChange={handleChangeMessage} />
        <StyledSendBtn disabled={message.trim().length === 0} onClick={handleClickSendBtn}>
          送信
        </StyledSendBtn>
      </StyledFooter>
    </>
  )
}

const StyledMessageList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
  overflow-y: auto;
`

const StyledMessageItem = styled.li<{ direction: 'left' | 'right' }>`
  max-width: 75%;
  margin-bottom: 8px;
  padding: 8px;
  list-style: none;
  border-radius: 4px;

  ${({ direction }) =>
    direction === 'left'
      ? css`
          align-self: auto;
          background: #f7f7f7;
        `
      : css`
          align-self: flex-end;
          background: #ebf1ff;
        `}
`

const StyledFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  background: #fff;
`

const StyledUserName = styled.p`
  width: 100%;
  font-size: 12px;
  color: #585858;
  margin-bottom: 8px;
`

const StyledMessageTextarea = styled.textarea`
  width: calc(100% - 92px);
  max-height: 34px;
  margin-right: 12px;
  padding: 4px;
  line-height: 1.3;
  border: 1px solid #a0a0a0;
  border-radius: 4px;
  resize: none;
`

const StyledSendBtn = styled.button`
  width: 70px;
  height: 44px;
  padding: 8px;
  line-height: 1.5;
  color: #fff;
  background: #698fe1;
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
