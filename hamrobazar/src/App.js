import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import Navmenu from './components/Navmenu';
import Login from './components/Login';
import Index from './components/Index';
import Register from './components/Register';
import About from './components/About';
import Contact from './components/Contact';
import UserNav from './components/User/Usernav';
import Dashboard from './components/User/Dashboard';
import Userrouter from './components/Userrouter';
import Admindashboard from './components/Admin/Admindashboard';
import Logout from './components/Logout';
import ViewProduct from './components/ViewProduct';
import PrivateRoute from './components/Utils/PrivateRoute';
import User from './components/User/User';
import Addproduct from './components/User/Addproduct';
import Myproduct from './components/User/Myproduct';
import UpdateProduct from './components/User/UpdateProduct';

class App extends Component {
    render() {
        return (
            <div className="App">

                <Router>
                    <Route exact path="/"><Index/></Route>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/product/:id" component={ViewProduct}/>
                    <Route path="/register" component={Register}/>

                    <PrivateRoute exact path="/dashboard" component={User}/>
                    <PrivateRoute exact path="/dashboard/myproduct" component={Myproduct}/>
                    <PrivateRoute exact path="/dashboard/product" component={Addproduct}/>
                    <PrivateRoute exact path="/dashboard/product/my/:id" component={UpdateProduct}/>

                </Router>

            </div>
        );
    }
}

export default App;
