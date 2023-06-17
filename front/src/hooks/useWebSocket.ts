import { useRef, useState, useMemo } from 'react'

type JoinAction = {
  action: 'join'
  id: number
  userName: string
}

type ExitAction = {
  action: 'exit'
  id: number
}

type SendMessageAction = {
  action: 'sendMessage'
  id: number
  userName: string
  message: string
}

export type SendMessageInfo = JoinAction | ExitAction | SendMessageAction

type ReceiveMessageInfo = SendMessageInfo & {
  participantNum: number
}

export type MessageInfo = Omit<SendMessageAction, 'action'>

export const useWebSocket = () => {
  const wsRef = useRef<WebSocket>()

  const [receiveMessageInfo, setReceiveMessageInfo] = useState<ReceiveMessageInfo[]>([])
  const [participantNum, setParticipantNum] = useState(0)
  const [isOpenWebSocket, setIsOpenWebSocket] = useState(false)

  const messageInfos = useMemo(() => {
    return receiveMessageInfo.reduce<MessageInfo[]>((acc, curr) => {
      return curr.action === 'sendMessage' && curr.message
        ? [...acc, { id: curr.id, userName: curr.userName, message: curr.message }]
        : acc
    }, [])
  }, [receiveMessageInfo])

  const receiveMessage = (data: ReceiveMessageInfo) => {
    switch (data.action) {
      case 'join':
        setParticipantNum(data.participantNum)
        break
      case 'exit':
        setParticipantNum(data.participantNum)
        break
      case 'sendMessage':
        setReceiveMessageInfo((prev) => [...prev, data])
        break
      default:
        break
    }
  }

  const resetMessageList = () => {
    setReceiveMessageInfo([])
  }

  const openWebSocket = () => {
    const open = (resolve: () => void) => {
      wsRef.current = new WebSocket('ws://localhost:3001/ws/message')
      setTimeout(() => {
        if (wsRef.current?.readyState !== 1) return
        wsRef.current.onmessage = (e: MessageEvent) => {
          const data: ReceiveMessageInfo = JSON.parse(e.data)
          receiveMessage(data)
        }
        setIsOpenWebSocket(true)
        resolve()
      }, 1000)
    }
    return new Promise<void>((resolve) => open(resolve))
  }

  const closeWebSocket = () => {
    setIsOpenWebSocket(false)
    wsRef.current?.close()
  }

  const sendMessage = (data: SendMessageInfo) => {
    wsRef.current?.send(JSON.stringify(data))
  }

  return {
    messageInfos,
    participantNum,
    isOpenWebSocket,
    openWebSocket,
    closeWebSocket,
    sendMessage,
    resetMessageList
  }
}
