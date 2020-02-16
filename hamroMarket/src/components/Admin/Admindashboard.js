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
import SideNavPage from '../User/SideNavPage'


export default class Admindashboard extends Component {
  
  

    render() {
         
        return (
            <div>
               <SideNavPage/>
               <Adminnav/>

            </div>
        )
    }
}
