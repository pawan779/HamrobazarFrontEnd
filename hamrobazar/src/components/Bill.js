import React, {Component} from 'react'
import {
    Form,
    Container,
    Alert,
    Row,
    Card,
    CardImg,
    CardHeader,
    CardBody,
    CardSubtitle,
    CardLink,
    Button,
    Col,
    CardTitle
} from 'reactstrap'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment-timezone'

export default class Bill extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            users: '',
            products: '',
            orders:''
        }
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        Axios
            .get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                console.log(response)
                this
                    .setState({users: response.data})
                    .catch(err => {
                        console.log(err)
                    })

            })
        Axios
            .get("http://localhost:3001/orders/" + id, this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({orders:response.data})
            })

        var cartID = localStorage.getItem("cart")
        Axios
            .get("http://localhost:3001/buy/" + cartID, this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({products: response.data.products})
            })
    }

    render() {
        
        const {products} = this.state
        const {users} = this.state
        const {orders}=this.state
        return (
            <div className="mt-5">
            
                <Container>
                    <div className="text-center"><Button color="secondary" onClick={()=>{setTimeout(window.print(),100)}}>Print</Button></div>
                <div className="text-right">Order Id: {orders._id}
        <p>Date: {orders.updatedAt}</p>
                 </div>
                    <Row>
                        <CardHeader className="col-md-6 mx-auto">

                            <CardBody>
                                <CardHeader>Full Name: {users.fullName}</CardHeader>
                                <CardHeader>Address: {users.address1}, {users.address2}, {users.address3}</CardHeader>
                                <CardHeader>Phone Number: {users.phone}</CardHeader>
                                <CardHeader>Mobile Number{users.mobilePhone}</CardHeader>
                                <CardHeader>Email Address: {users.email}</CardHeader>
                                <CardBody className="text-center">
                                </CardBody>
                            </CardBody>
                        </CardHeader>

                        <Col md="6">
                            {products.length
                                ? (products.map(product =>< div key = {
                                    product._id
                                } > <Card>
                                    <CardBody>
                                        <CardTitle>{product.productName}</CardTitle>
                                        <CardSubtitle>Price: {product.price}</CardSubtitle>
                                        <hr/>
                                        <CardSubtitle>Quantity: {product.quantity}</CardSubtitle>
                                        <hr/>
                                        <CardSubtitle>Total Price:{product.total}</CardSubtitle>
                                    </CardBody>
                                </Card> </div>)
                           
     ):null}
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}
