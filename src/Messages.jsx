import React, {Component} from 'react';

export default class Message extends Component {
  render(){
    const messages = this.props.messages.map((message, index) => {
      let alternatingColor = '#ffffff';
      let maxWidth = '60%';
      let userColor = message.color;
        if (index % 2 !== 0){
          alternatingColor = '#ededed';
        };
        switch (message.type){
          case 'incomingMessage' :
            return (
              <div style={{backgroundColor: alternatingColor}} className="message" key={message.id}>
                <span className="message-username" style={{color: userColor}}>{message.username}</span>
                <span className="message-content">{message.content}</span>
              </div>
            )
            break;
          case 'incomingPicture' :
            return (
              <div style={{backgroundColor: alternatingColor}} className="message" key={message.id}>
                <span className="message-username" style={{color: userColor}}>{message.username}</span>
                <span className="message-content"><img src={message.content} style={{maxWidth: maxWidth}}/></span>
              </div>
            )
          break;
          case 'incomingNotification' :
            return (
              <div style={{backgroundColor: alternatingColor}} className="notification" key={message.id}>
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
