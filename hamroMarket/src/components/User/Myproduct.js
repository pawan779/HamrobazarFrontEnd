import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import User from './User'
import Addproduct from './Addproduct'
// import Myproduct from './Myproduct'       <Navmenu/>
import Usernav from './Usernav'
import axios from 'axios'
import {Alert,Container, Card,
    CardImg,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle,
    Row,Button,
    Col,Toast,ToastHeader,ToastBody, CardHeader} from 'reactstrap'
import Axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard'
import SideNavPage from './SideNavPage'
import Footer from '../home/Footer'

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
            products: {},
            path: '',
            proID:'',
            isDeleted:''
            
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
            .get('http://localhost:3001/products/my', this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({products: response.data, path: 'http://localhost:3001/uploads/'})
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDelete=event=>{
      if(confirm("Are you sure to delete this item ?"))
      {

        Axios.delete("http://localhost:3001/products/"+event,this.state.config)
        .then((response)=>{
            console.log(response.data)
        this.setState({isDeleted:"Product deleted sucessfully"})
        toast("Product deleted sucessfully")
        })
        .catch(err=>{
            console.log(err)
        })
      }
   
    }

    render() {
        if (this.state.notLoggedIn) { < Redirect to = "/login" />
    } else {

        const {products} = this.state
        return (
            <div>
                <SideNavPage/>
                <Usernav/>
              <Container>

                  { this.state.isDeleted ?
                  (
                   
                    <ToastContainer/>
                
                  ):null
                }
                    <Row>
                    {
                        products.length ?
                        (products.map(product=><CardTitle className="col-md-4 col-sm-6" key={product._id}>
                       <CardBody className="cardImage">
                        <img src={this.state.path + product.image} alt="Card image"/>
                        </CardBody>
                    <CardBody>
                        <CardTitle>{product.productName}</CardTitle>
                        <CardTitle>{product.productCondition}</CardTitle>
                        <CardSubtitle>Price: Rs.{product.productPrice}</CardSubtitle>
                        <CardText>{product.productDescription}</CardText>
                        <CardLink>
                        <Link to={`/dashboard/product/my/${product._id}`}>
                            <Button renderAs="button" color="warning">
                                Edit
                            </Button>
                            </Link>
                            </CardLink>
                            <CardLink>
                     
                            <Button renderAs="button" color="danger" onClick={(id)=>{this.handleDelete(product._id)}}>
                                Delete
                            </Button>
                        
                            </CardLink>
                    </CardBody>
                    </CardTitle>
                        ))
:(<Alert color="warning">No product found</Alert>)
}
</Row>            
</Container>
<Footer/>
</div>
        )
    }
}
}
