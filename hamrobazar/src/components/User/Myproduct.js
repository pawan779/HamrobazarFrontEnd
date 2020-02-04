import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import User from './User'
import Addproduct from './Addproduct'
// import Myproduct from './Myproduct'       <Navmenu/>
import Usernav from './Usernav'
import axios from 'axios'
import {Alert} from 'reactstrap'

export default class Myproduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            notLoggedIn: false,
            product: {},
            path: ''
        }
    }

    // config:{     headers:{'Authorization':`Bearer
    // ${localStorage.getItem('token')}`}

    componentWillMount()
    {
        if (localStorage.getItem('token')) {
            this.setState({
                token: localStorage.getItem('token')
            })

        } else {
            this.setState({notLoggedIn: true})
        }
    }
    componentDidMount() {
        axios
            .get('http://192.168.1.21:3001/products/my',this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({product: response.data, path: 'http://192.168.1.21:3001/uploads/'})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        if (this.state.notLoggedIn) { < Redirect to = "/login" />
    } else {

        const {product} = this.state
        return (
            <div>
                <h1>This is My product page</h1>
                <div>
                    {product.length
                        ? (product.map(products => <div key={products._id}>{products.productName}{products.productPrice}{products.image} {products.createdAt}
                            <img src={this.state.path + products.image}></img>
                        </div>))
                        : <Alert color="warning">No product found</Alert>
}
                </div>
            </div>
        )
    }
}
}
