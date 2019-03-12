import React, {Component} from 'react';

export default class Message extends Component {
  render(){

    const messages = this.props.messages.map((message) => {
        if (message.type === 'incomingMessage'){
          return (
            <div className="message" key={message.id}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          )
        }
    })
    return (
      <main className="messages">
        {messages}
        <div className="message system">
        </div>
      </main>
    );
  }
}
