import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Messages />
        <ChatBar />
      </div>

    );
  }
}
export default App;




