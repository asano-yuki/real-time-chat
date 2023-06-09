import React, { useState, useCallback } from 'react'
import { ChatModal } from './components/ChatModal'
import styles from './style.module.css'

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
      <section className={styles.root}>
        <h1 className={styles.title}>チャットアプリ</h1>
        <p className={styles.participants}>
          参加者
          <span className={styles.num}>2/5</span>
        </p>
        <button
          className={styles.btn}
          disabled={showModal}
          onClick={handleEnterRoom}
        >
        入室
        </button>
      </section>
      <ChatModal showModal={showModal} handleLeaveRoom={handleLeaveRoom} />
    </>
  )
}
