import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';
import NavBar from './NavBar.jsx';
import data from './Messages.json';
import {generateRandomId} from '../utils.js';
import { IncomingMessage } from 'http';



class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      messages: data.messages,
      currentUser: data.currentUser.name,
    });
    this.addNewMessage = this.addNewMessage.bind(this)
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

  addNewMessage(msg){
    const oldMessages = this.state.messages;
    const newMessage = {
      id: generateRandomId(),
      type: 'incomingMessage',
      username: this.state.currentUser,
      content: msg
    }
    const newMessages = [...oldMessages, newMessage];
    this.setState({messages: newMessages})
  }


  render() {
    return (
      <div>
        <NavBar />
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage}/>
      </div>

    );
  }
}
export default App;




