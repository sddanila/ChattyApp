import React, {Component} from 'react';

class ChatBar extends Component{
  render(){
  
    const onKeyDown = event => {
      if(event.which === 13){
        event.preventDefault();
        let content = event.target.value;
        this.props.sendMessage(content);
        event.target.value = '';
      }
    }

    const onEnter = event => {
      if(event.which === 13){
        event.preventDefault();
        let content = event.target.value;
        this.props.addCurrentUser(content);
      }
    }

    return (
      <footer className="chatbar">
        <input onKeyDown={onEnter} className="chatbar-username" placeholder={this.props.currentUser} defaultValue="Anonymous"/>
        <input onKeyDown={onKeyDown} name="content" className="chatbar-message" defaultValue="" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
};

export default ChatBar;