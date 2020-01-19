import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import './App.css';
import Navmenu from './components/Navmenu';
import Login from './components/Login';
import Index from './components/Index';


class App extends Component {
  render() {
    return (
      <div className="App">
    
       <Router>
       <Navmenu/>
         <Switch>
           <Route exact path="/" Component={Index}/>
          <Route exact path="/login" Component={Login}/>
         </Switch>
       </Router>
      </div>
    );
  }
}

export default App;
