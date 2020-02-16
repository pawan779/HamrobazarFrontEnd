import React, {Component} from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import '../App.css';
import Login from './Login';
import Register from './Register';
import About from './About';
import Contact from './Contact';
import Navmenu from './Navmenu'
import Logout from './Logout';
import Index from './Index';
import ViewProduct from './ViewProduct';
import Usernav from './User/Usernav';



class Userrouter extends Component {
    render() {
        return (

                <Router>
             
            
                   <Navmenu/>
                    <Switch>
                    <Route exact path="/" component={Index}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/about" component={About}/>
                        <Route exact path="/contact" component={Contact}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Route path="/product/:id" component={ViewProduct}/>
                        
                        
                    </Switch>
                 
                </Router>
        );
    }
}

export default Userrouter;
