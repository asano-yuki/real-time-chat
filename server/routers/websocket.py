from fastapi import APIRouter, WebSocket

router = APIRouter()

# 接続中のクライアントを識別するためのIDを格納
clients: dict = {}


@router.websocket("/ws/message")
async def websocket_read_message(ws: WebSocket):
    await ws.accept()
    key = ws.headers.get("sec-websocket-key")
    clients[key] = ws
    try:
        while True:
            data = await ws.receive_json()
            participantNum = len(clients)
            if data["action"] != "exit":
                data["participantNum"] = participantNum
            else:
                data["participantNum"] = participantNum - 1
            for val in clients.values():
                client: WebSocket = val
                await client.send_json(data)
    except:
        del clients[key]
