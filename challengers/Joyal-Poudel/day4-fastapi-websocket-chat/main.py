from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json

app = FastAPI(title="WebSocket Chat API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected clients
class ConnectionManager:
    def __init__(self):
        self.active_connections = []
        self.users = {}

    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.users[id(websocket)] = {
            "username": username,
            "connected_at": datetime.now().isoformat()
        }

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            del self.users[id(websocket)]

    async def broadcast(self, data: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(data)
            except:
                pass

    async def send_personal(self, websocket: WebSocket, data: dict):
        try:
            await websocket.send_json(data)
        except:
            pass

    def get_active_users(self):
        return [user for user in self.users.values()]

manager = ConnectionManager()

# HTML Page
html = """
<!DOCTYPE html>
<html>
<head>
    <title>Real-time Chat</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            width: 100%;
            height: 600px;
            display: flex;
            flex-direction: column;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px 15px 0 0;
            text-align: center;
        }

        .header h1 {
            font-size: 1.5em;
            margin-bottom: 5px;
        }

        .status {
            font-size: 0.85em;
            opacity: 0.9;
        }

        .status.connected::before {
            content: "● ";
            color: #4caf50;
        }

        .status.disconnected::before {
            content: "● ";
            color: #ff6b6b;
        }

        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f9f9f9;
            border-bottom: 1px solid #eee;
        }

        .message {
            margin-bottom: 15px;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .message.own {
            text-align: right;
        }

        .message.system {
            text-align: center;
            color: #999;
            font-size: 0.9em;
            margin: 10px 0;
        }

        .message-content {
            display: inline-block;
            padding: 10px 15px;
            border-radius: 12px;
            max-width: 70%;
            word-wrap: break-word;
        }

        .message.own .message-content {
            background: #667eea;
            color: white;
        }

        .message:not(.own) .message-content {
            background: #e0e0e0;
            color: #333;
        }

        .message-meta {
            font-size: 0.75em;
            color: #999;
            margin-top: 5px;
        }

        .input-area {
            padding: 20px;
            display: flex;
            gap: 10px;
        }

        .input-area input {
            flex: 1;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 1em;
            transition: border-color 0.3s;
        }

        .input-area input:focus {
            outline: none;
            border-color: #667eea;
        }

        .send-btn {
            padding: 12px 25px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
        }

        .send-btn:hover {
            background: #5568d3;
        }

        .send-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .username-input {
            padding: 10px;
            margin-bottom: 10px;
            border: 2px solid #ddd;
            border-radius: 8px;
            width: 100%;
        }

        .online-users {
            padding: 10px;
            background: #f0f0f0;
            border-bottom: 1px solid #ddd;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💬 Real-time Chat</h1>
            <div class="status disconnected" id="status">Connecting...</div>
        </div>

        <div class="online-users">
            <strong>Online:</strong> <span id="userCount">0</span> users
        </div>

        <div class="messages" id="messages"></div>

        <div class="input-area">
            <input 
                type="text" 
                id="messageInput" 
                placeholder="Type your message..." 
                disabled
            />
            <button id="sendBtn" class="send-btn" disabled>Send</button>
        </div>
    </div>

    <script>
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const messagesDiv = document.getElementById('messages');
        const statusDiv = document.getElementById('status');
        const userCountSpan = document.getElementById('userCount');

        let username = prompt('Enter your username:') || 'Anonymous';
        let ws = null;

        function connect() {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            ws = new WebSocket(`${protocol}//${window.location.host}/ws/${username}`);

            ws.onopen = () => {
                console.log('Connected');
                statusDiv.textContent = 'Connected';
                statusDiv.className = 'status connected';
                messageInput.disabled = false;
                sendBtn.disabled = false;

                addSystemMessage(`${username} joined the chat`);
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 'connection_message') {
                    addSystemMessage(data.message);
                    userCountSpan.textContent = data.user_count;
                } else if (data.type === 'user_message') {
                    const isOwn = data.username === username;
                    addMessage(data.username, data.message, data.timestamp, isOwn);
                } else if (data.type === 'user_count') {
                    userCountSpan.textContent = data.count;
                }
            };

            ws.onclose = () => {
                console.log('Disconnected');
                statusDiv.textContent = 'Disconnected';
                statusDiv.className = 'status disconnected';
                messageInput.disabled = true;
                sendBtn.disabled = true;
                addSystemMessage('Connection lost. Reconnecting in 3 seconds...');
                setTimeout(connect, 3000);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                addSystemMessage('Error: Connection failed');
            };
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message && ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    message: message,
                    username: username
                }));
                messageInput.value = '';
                messageInput.focus();
            }
        }

        function addMessage(username, message, timestamp, isOwn) {
            const messageEl = document.createElement('div');
            messageEl.className = `message ${isOwn ? 'own' : ''}`;

            const contentEl = document.createElement('div');
            contentEl.className = 'message-content';
            contentEl.textContent = message;

            const metaEl = document.createElement('div');
            metaEl.className = 'message-meta';
            metaEl.textContent = `${username} • ${new Date(timestamp).toLocaleTimeString()}`;

            messageEl.appendChild(contentEl);
            messageEl.appendChild(metaEl);

            messagesDiv.appendChild(messageEl);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function addSystemMessage(message) {
            const messageEl = document.createElement('div');
            messageEl.className = 'message system';
            messageEl.textContent = message;
            messagesDiv.appendChild(messageEl);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        connect();
    </script>
</body>
</html>
"""

@app.get("/")
async def get():
    return HTMLResponse(html)

@app.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await manager.connect(websocket, username)
    
    # Notify others
    await manager.broadcast({
        "type": "connection_message",
        "message": f"{username} joined the chat",
        "user_count": len(manager.active_connections)
    })

    try:
        while True:
            data = await websocket.receive_json()
            message = data.get("message")
            
            if message:
                # Broadcast message to all clients
                await manager.broadcast({
                    "type": "user_message",
                    "username": username,
                    "message": message,
                    "timestamp": datetime.now().isoformat()
                })
                
                # Update user count
                await manager.broadcast({
                    "type": "user_count",
                    "count": len(manager.active_connections)
                })
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({
            "type": "connection_message",
            "message": f"{username} left the chat",
            "user_count": len(manager.active_connections)
        })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
