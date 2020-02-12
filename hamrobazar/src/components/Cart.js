import React, { Component } from 'react'
import Axios from 'axios'
import { Card } from 'react-bootstrap'

export default class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            cart:'',
            grandTotal:0
        }
    }
    

    componentWillMount(){
        Axios.get("http://192.168.1.21:3001/cart",this.state.config)
        .then((response)=>
        {
            console.log(response)
            this.setState({cart:response.data.products})
        })
    }

    render() {
        const {cart}=this.state
        return (
            <div>
                {
                  cart.length?
                  (
                        cart.map(carts=><Card key={carts._id}>


    <h2>{carts.total}</h2>
                   
{this.state.grandTotal=cart.total+this.state.grandTotal}

                        </Card>)
                  )  
                  :null
                }
                 
            </div>
        )
    }
}
