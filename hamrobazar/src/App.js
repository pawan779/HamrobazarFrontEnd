import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navmenu from './components/Navmenu';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Navmenu/>
      </div>
    );
  }
}

export default App;
