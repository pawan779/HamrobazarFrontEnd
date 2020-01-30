import React, { Component } from 'react'
import {} from 'react-router-dom'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import User from './User'
import Addproduct from './Addproduct'
import Myproduct from './Myproduct'
import Usernav from './Usernav'
import axios from 'axios'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                    token:'',
                    isLoggedIn:true
             }
        }
    }
    // config:{
    //     headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}

    componentWillMount()
    {
        if(localStorage.getItem('token'))
        {
            this.setState({token:localStorage.getItem('token')})

        }
        else
        {
            this.setState({isLoggedIn:false})
        }
    }
    componentDidMount(){
        axios.get('http://192.168.1.21:3001/users/me',{headers:{'Authorization':`Bear`}})
    }
    
    render() {
        return (
            <div>
               <Router>
                  
                   <Switch>
                       <Route path="/dashboard" component={Usernav}/>
                    <Route exact path="/dashboard" component={User}/>
                    <Route exact path="/dashboard/product" component={Addproduct}/>
                    <Route exact path="/dashboard/myproduct" component={Myproduct}/>
                   </Switch>
               </Router>

                </div>
        )
    }
}
