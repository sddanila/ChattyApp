import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';
import NavBar from './NavBar.jsx';
import data from './Messages.json';
import {generateRandomId} from '../utils.js';
import { IncomingMessage } from 'http';

const socket = new WebSocket('ws://localhost:3001');

class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      messages: [],
      currentUser: 'Anonymous'
    });
    
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.addNewMessage = this.addNewMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.sendCurrentUser = this.sendCurrentUser.bind(this);
  }
  // componentDidMount(){
  //   console.log("componentDidMount <App/>")
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     console.log(this);
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: generateRandomId(), type: 'incomingMessage', username: "Michelle", content: "Hello there!"};
  //     const newMessages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: newMessages}, () => {
  //       console.log('msg', this.state.messages);  
  //     })
      
  //   }, 3000);
  // }

  
  componentDidMount(){
    const parent = this;
    socket.onopen = function(event) {
      console.log('Connected to client');
    };
    socket.onmessage = function(event){
      console.log(event.data);
      let incoming = JSON.parse(event.data);
      let oldMessages = parent.state.messages;
      switch(incoming.type){
        case "incomingMessage":
          let newMessages = oldMessages.concat(incoming);
          parent.setState({messages: newMessages});
          break;
        case "incomingNotification":
          let newNotification = oldMessages.concat(incoming);
          parent.setState({messages: newNotification});
          break;
        default:
          throw new Error("Uknown event type" + event.type);
      }
    }
  }

  sendMessage(msg){
    const message = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: msg
    }
    socket.send(JSON.stringify(message));
  }

  addCurrentUser(name){
    this.setState({currentUser: name});
  }

  sendCurrentUser(newName){
    const message = {
      type: 'postNotification',
      content: `${this.state.currentUser} has changed their name to ${newName}`
    }
    socket.send(JSON.stringify(message));
  }
  // addNewMessage(msg){
  //   const oldMessages = this.state.messages;
  //   const newMessage = {
  //     type: 'incomingMessage',
  //     username: this.state.currentUser,
  //     content: msg
  //   }
  //   const newMessages = [...oldMessages, newMessage];
  //   this.setState({messages: newMessages})
  // }

  render() {
    return (
      <div>
        <NavBar />
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




