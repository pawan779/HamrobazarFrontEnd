import React, {Component} from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import '../App.css';
import Login from './Login';
import Register from './Register';
import About from './About';
import Contact from './Contact';
import Navmenu from './Navmenu'



class Userrouter extends Component {
    render() {
        return (

                <Router>
             
              
                   
                {/* <Route exact path="/dashboard" component={Dashboard}/> */}
                <Navmenu/>
                   
                    <Switch>
                       
                      
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/contact" component={Contact}/>
                    </Switch>
                 
                </Router>
        );
    }
}

export default Userrouter;
