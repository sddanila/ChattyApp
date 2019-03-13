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
      let oldMessages = parent.state.messages;
      let newMessage = JSON.parse(event.data);
      let newMessages = oldMessages.concat(newMessage);
      parent.setState({messages: newMessages});
    }
  }

  sendMessage(msg){
    const message = {
      type: 'incomingMessage',
      username: this.state.currentUser,
      content: msg
    }
    socket.send(JSON.stringify(message));
  }

  addCurrentUser(name){
    this.setState({currentUser: name});
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
        <ChatBar currentUser={this.state.currentUser} addCurrentUser={this.addCurrentUser} addNewMessage={this.addNewMessage} sendMessage={this.sendMessage}/>
      </div>

    );
  }
}
export default App;




