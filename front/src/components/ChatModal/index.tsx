import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { Message } from '../Message'
import type { ChangeEvent } from 'react'
import styles from './style.module.css'

interface Props {
  handleLeaveRoom: () => void
}

export const ChatModal = ({
  handleLeaveRoom
}: Props) => {
  const nodeRef = useRef(null)

  const [message, setMessage] = useState('')

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    setMessage(e.target.value)
  }

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
          <li className={styles.left}>
            <Message
              name='太郎'
              text='よろしくお願いします。'
            />
          </li>
          <li className={styles.right}>
            <Message
              name='花子'
              text='よろしくお願いします。'
            />
          </li>
          <li className={styles.right}>
            <Message
              name='ヒロ'
              text='よろしくお願いします。'
            />
          </li>
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
