import React, { useState } from 'react'
import { ChatModal } from './components/ChatModal'
import styles from './style.module.css'

export const App = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClickBtn = () => {
    setShowModal(true)
  }

  return (
    <>
      { showModal && <ChatModal />}
      <button
        className={styles.btn}
        disabled={showModal}
        onClick={handleClickBtn}
      >
				チャット<br/>開始
      </button>
    </>
  )
}
