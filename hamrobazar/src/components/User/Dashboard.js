import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import User from './User'
import Addproduct from './Addproduct'
import Myproduct from './Myproduct'
import Usernav from './Usernav'
import axios from 'axios'
import PrivateRoute from '../Utils/PrivateRoute'
import UpdateProduct from './UpdateProduct'

export default class Dashboard extends Component {
  
  

    render() {
         
        return (
            <div>
                <Router>
                <PrivateRoute path="/dashboard" component={Usernav}/>
                    <Switch>
                       
                        <PrivateRoute exact path="/dashboard" component={Myproduct}/>
                        <Route exact path="/dashboard/product" component={Addproduct}/>
                        <Route path="/dashboard/myproduct" component={Myproduct}/>
                        <Route exact path="/dashboard/product/my/:id" component={UpdateProduct}/>
                    </Switch>
                </Router>

            </div>
        )
    }
}
