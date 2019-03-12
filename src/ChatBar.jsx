import React, {Component} from 'react';

class ChatBar extends Component{
  render(){
  
    const onKeyDown = event => {
      if(event.which === 13){
        event.preventDefault();
        let content = event.target.value;
        this.props.addNewMessage(content);
        event.target.value = '';
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} />
        <input onKeyDown={onKeyDown} name="content" className="chatbar-message" defaultValue="" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
};

export default ChatBar;