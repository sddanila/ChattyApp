import React, {Component} from 'react';

export default class NavBar extends Component {
  render (){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty <i className="fas fa-comments"></i></a>
        <span>{this.props.onlineUsers} online users</span>
      </nav>
    );
  }
}