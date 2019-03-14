// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const isUrl = require('./utils.js');
const imageUrl = require('./utils.js');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('open', function open(){
    ws.send('This is working too - SERVER SIDE');
  });
  
  ws.on('message', function incoming (data){
    console.log("THIS IS THE CONSOLE IN THE TERMNAL", data);
    

  // ws.send('This is where the data should show up');
    wss.clients.forEach(client => {
        console.log(client.readyState);
        console.log(WebSocket.OPEN);
      if(client.readyState === WebSocket.OPEN){
        console.log('Sending')
        client.send(data)
      }
    })
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});