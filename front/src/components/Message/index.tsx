import React from 'react'
import styles from './style.module.css'

interface Props {
  name: string
  text: string
}

export const Message = ({ name, text }: Props) => {
  return (
    <div>
      <p className={styles.name}>{name}</p>
      <p className={styles.text}>{text}</p>
    </div>
  )
}
