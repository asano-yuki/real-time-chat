import React, { useState, memo } from 'react'
import type { ChangeEvent } from 'react'
import styled from 'styled-components'

interface Props {
  onLogin: (userName: string) => void
}

export const Login = memo(({ onLogin }: Props) => {
  const [userName, setUserName] = useState('')

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleClickEnterRoomBtn = () => {
    onLogin(userName)
  }

  return (
    <StyledContainer>
      <StyledInput
        type='text'
        onChange={handleChangeUsername}
        placeholder='ユーザー名を入力していください。'
        alt='ユーザー名の入力'
      />
      <StyledEnterBtn disabled={userName.trim().length === 0} onClick={handleClickEnterRoomBtn}>
        入 室
      </StyledEnterBtn>
    </StyledContainer>
  )
})

Login.displayName = 'Login'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px 0;
  padding: 16px;
`

const StyledInput = styled.input`
  width: 300px;
  margin-top: 8px;
  padding: 4px;
  line-height: 1.3;
  border: 1px solid #a0a0a0;
  border-radius: 4px;
  ::placeholder {
    color: #cdcdcd;
  }
`

const StyledEnterBtn = styled.button`
  display: block;
  width: 70px;
  padding: 8px;
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
