import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import User from '../User/User'
import Addproduct from '../User/Addproduct'
import Myproduct from '../User/Myproduct'
import axios from 'axios'
import PrivateRoute from '../Utils/PrivateRoute'
import Adminnav from './Adminnav'
import AdminRoute from '../Utils/AdminRoute'
import AllProduct from './AllProduct'
import VerifyProduct from './VerifyProduct'


export default class Admindashboard extends Component {
  
  

    render() {
         
        return (
            <div>
                <Router>
                <AdminRoute path="/admin/dashboard" component={Adminnav}/>
                    <Switch>
                   
                        <AdminRoute exact path="/admin/dashboard" component={AllProduct}/>
                      
                        <Route path="/admin/dashboard/product" component={AllProduct}/>
                        <Route exact path="/admin/dashboard/product/verifyproduct" component={VerifyProduct}/>
                        <Route path="/admin/dashboard/myproduct" component={Myproduct}/>
                    
                      
                    </Switch>
                </Router>

            </div>
        )
    }
}
