import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import './App.css';
import Navmenu from './components/Navmenu';
import Login from './components/Login';
import Index from './components/Index';
import Register from './components/Register';
import About from './components/About';
import Contact from './components/Contact';



class App extends Component {
  render() {
    return (
      <div className="App">
    
       <Router>
      
       <Navmenu/>
         <Switch>
           <Route exact path="/" component={Index}/>
       <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={Contact}/>
         </Switch>
        
       </Router>
       
      </div>
    );
  }
}

export default App;
