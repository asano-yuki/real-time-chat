import React from 'react'
import Draggable from 'react-draggable'
import styles from './style.module.css'

export const ChatModal = () => {
	return (
		<Draggable
			axis="both"
			handle=".handle"
			defaultPosition={{x: 100, y: 40}}
			grid={[5, 5]}
			scale={1}
		>
			<div className={`${styles.root} handle`}>
				<div>Drag from here</div>
				<div>This readme is really dragging on...</div>
			</div>
		</Draggable>
	)
}
