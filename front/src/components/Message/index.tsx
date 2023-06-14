import React from 'react'
import Styled from 'styled-components'

interface Props {
  name?: string
  text: string
}

export const Message = ({ name, text }: Props) => {
  return (
    <>
      {name && <StyledName>{name}</StyledName>}
      <StyledText>{text}</StyledText>
    </>
  )
}

const StyledName = Styled.p`
  font-size: 12px;
  color: #cacaca;
`

const StyledText = Styled.p`
  font-size: 14px;
  color: #5f5f5f;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
`
