import React, { Component } from 'react'
import Axios from 'axios'

export default class ViewProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:''

        }
    }
    
    
componentWillMount()
{
    var proID=this.props.match.params.id

    Axios.get("http://localhost:3001/products/"+proID)
    .then((response)=>{
        console.log(response.data)
        this.setState({product:response.data})
    })
}
 
    render() {
     
        return (
            <div>
               {this.state.product.productName}
            </div>
        )
    }
}
