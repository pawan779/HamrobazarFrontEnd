import React, { Component } from 'react'
import Axios from 'axios'

export default class VerifyProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    // sendID(product)
    // {
    //     alert("product")
    // }
    componentWillMount()
    {
        Axios.get("http://192.168.1.21:3001/my/")
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
