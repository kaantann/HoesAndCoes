const express = require('express');
const app = express();
const myServer = require('http').createServer(app);
const ws = require('ws');

const wss = new ws.Server({ server: myServer });

const MAX_PLAYER_NUMBER = 4;
let currentPlayerNumber = 0;

wss.on("connection", function connection(webSocket) {
    if (currentPlayerNumber != MAX_PLAYER_NUMBER) {
        webSocket.terminate();
        return;
    }

    console.log('A new client connected');
    currentPlayerNumber++;


    webSocket.on("message", function incoming(message) {
        try {
            const data = JSON.parse(message);
            const { userId, action } = data;

            // Verify user authentication
            if (!userId || !userSessions.has(userId)) {
                console.log('Unauthorized action from unknown user');
                return;
            }

            // Handle action based on user ID
            console.log(`User ${userId} performed action: ${action}`);

            // Broadcast the received message to all connected clients
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });



});



app.get("/",(req,res) => {
    
});

const PORT = 5050;
myServer.listen(PORT,() => console.log("Listening on port ${PORT}"))
