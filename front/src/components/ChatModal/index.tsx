import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Draggable from 'react-draggable'
import { Message } from '../Message'
import type { ChangeEvent } from 'react'
import type { ChatResponse } from '../../types/chat'
import styles from './style.module.css'

interface Props {
  showModal: boolean
  handleLeaveRoom: () => void
}

export const ChatModal = ({
  showModal,
  handleLeaveRoom
}: Props) => {
  const nodeRef = useRef(null)

  const [message, setMessage] = useState('')
  const [chatInfo, setChatInfo] = useState<ChatResponse[]>()

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    if (!showModal) return
    const f = async () => {
      const res = await axios.get<ChatResponse[]>('http://localhost:3001/chat/1')
      setChatInfo(res.data)
    }
    f()
  }, [showModal])

  if (!showModal) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="both"
      handle=".header"
      defaultPosition={{x: 200, y: 0}}
      grid={[5, 5]}
      scale={1}
    >
      <div ref={nodeRef} className={styles.root}>
        <div className={`header ${styles.header}`}>
          <h2 className={styles.title}>チャット</h2>
          <span className={styles.close} onClick={handleLeaveRoom}>✖️</span>
        </div>
        <ul className={styles.message_list}>
          { chatInfo?.map(({ id, user_name, message }) => (
            <li key={id} className={styles.left}>
              <Message
                name={user_name}
                text={message}
              />
            </li>
          )) }
        </ul>
        <div className={styles.footer}>
          <textarea
            name='message'
            className={styles.message}
            maxLength={50}
            value={message}
            onChange={handleChangeMessage}
          />
          <button className={styles.btn} disabled={message.trim().length === 0}>
            送信
          </button>
        </div>
      </div>
    </Draggable>
  )
}
