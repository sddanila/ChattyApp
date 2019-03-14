import React, {Component} from 'react';

export default class Message extends Component {
  render(){
    const messages = this.props.messages.map((message, index) => {
      let alternatingColor = '#ffffff';
      let userColor = message.color;
        if (index % 2 !== 0){
          alternatingColor = '#DCDCDC';
        };
        if (message.type === 'incomingMessage'){
          return (
            <div style={{backgroundColor: alternatingColor}} className="message" key={message.id}>
              <span className="message-username" style={{color: userColor}}>{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          )
        } else if (message.type === 'incomingNotification'){
          return (
            <div className="notification" key={message.id}>
              <span className="notification-content"><em>{message.content}</em></span>
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
