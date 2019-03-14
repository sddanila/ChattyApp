// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// COUNTER  AND COLOR FOR ONLINE USERS
let colors = [
  '#4289f4',
  '#8941f4',
  '#147f3f',
  '#af1818'
]
const onlineUsers = {counter: 0};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  onlineUsers.counter++;
  ws.uniqueColor = colors[Math.floor(Math.random()*4)];

  // SEND USER NUMBER OR MESSAGE TO EVERY CLIENT
  wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
      client.send(JSON.stringify(data));
    })
  }
  
  wss.broadcast(onlineUsers);
  
  // PARSE INCOMING MESSAGE AND CHANGE MESSAGE TYPE TO MESSAGE OR NOTIFICATION
  ws.on('message', function incoming (data){
    let parsedMessage = JSON.parse(data);
    switch(parsedMessage.type){
      case 'postMessage' : 
        parsedMessage.id = uuidv4()
        parsedMessage.type = 'incomingMessage'
        parsedMessage.color = ws.uniqueColor
        // SEND DATA TO ALL CLIENTS
        wss.broadcast(parsedMessage)
        break;
      case 'postNotification' : 
        parsedMessage.id = uuidv4()
        parsedMessage.type = 'incomingNotification'
          // SEND DATA TO ALL CLIENTS
          wss.broadcast(parsedMessage);
          break;
      case 'postPicture' :
        parsedMessage.id = uuidv4()
        parsedMessage.type = 'incomingPicture'
        // SEND DATA TO ALL CLIENTS
        wss.broadcast(parsedMessage);
        break;
      default: 
        throw new Error("Unknown data type received: ", parsedMessage.type)
    }


  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUsers.counter--;
    wss.broadcast(onlineUsers);
  });
});