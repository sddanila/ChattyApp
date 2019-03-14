import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';
import NavBar from './NavBar.jsx';
import data from './Messages.json';
import { isNumber } from 'util';
import {isUrl} from '../utils.js';
import {checkImage} from '../utils.js';

const socket = new WebSocket('ws://localhost:3001');

class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      messages: [],
      currentUser: 'Anonymous',
      onlineUsers: 0
    });
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.sendCurrentUser = this.sendCurrentUser.bind(this);
  }

  // HANDLE OPEN AND INCOMING DATA
  componentDidMount(){
    const parent = this;
    socket.onopen = function(event) {
      console.log('Connected to client');
    };
    socket.onmessage = function(event){
      console.log(event);
      let incoming = JSON.parse(event.data);
      if(isNumber(incoming.counter)){
        parent.setState({onlineUsers: incoming.counter});
      } else {
        let oldMessages = parent.state.messages;
        switch(incoming.type){
          case "incomingMessage":
            let newMessages = oldMessages.concat(incoming)
            parent.setState({messages: newMessages})
            break;
          case "incomingNotification":
            let newNotification = oldMessages.concat(incoming)
            parent.setState({messages: newNotification})
            break;
          case "incomingPicture":
            let newPicture = oldMessages.concat(incoming)
            parent.setState({messages: newPicture})
            break;
          default:
            throw new Error("Uknown event type " + event.type);
        }
      }
    }
  }

  // SEND MESSAGE CONDITIONALLY BASED ON TYPE TO SERVER
  sendMessage(msg){
    let message = {};
    if(isUrl(msg) && checkImage(msg)){
      message = {
        type: 'postPicture',
        username: this.state.currentUser,
        content: msg
      }
    } else {
      message = {
        type: 'postMessage',
        username: this.state.currentUser,
        content: msg
      }
    }
    socket.send(JSON.stringify(message));
  }

  // ADD CURRENT USER TO APP.STATE
  addCurrentUser(name){
    this.setState({currentUser: name});
  }

  // SEND THE INFO ABOUT THE CURRENT USER TO SERVER
  sendCurrentUser(newName){
    const message = {
      type: 'postNotification',
      content: `${this.state.currentUser} has changed their name to ${newName}`
    }
    socket.send(JSON.stringify(message));
  };
  render() {
    return (
      <div>
        <NavBar onlineUsers={this.state.onlineUsers}/>
        <Messages messages={this.state.messages}/>
        <ChatBar 
          currentUser={this.state.currentUser} 
          addCurrentUser={this.addCurrentUser}
          sendCurrentUser={this.sendCurrentUser}
          addNewMessage={this.addNewMessage} 
          sendMessage={this.sendMessage}/>
      </div>
    );
  }
}
export default App;




