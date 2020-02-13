import React, {Component} from 'react'
import Axios from 'axios'
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    CardImg,
    CardBody,
    Input
} from 'reactstrap'
import Navmenu from './Navmenu'
import {Link} from 'react-router-dom'
import {CardTitle} from 'react-bootstrap/Card'

export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            cart: '',
            cartItem: '',
            path: '',
            grandTotal: 0,
            totalQuantity: 0
        }
    }

    componentWillMount() {

        Axios
            .get("http://192.168.1.21:3001/cart", this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({cart: response.data.products, cartItem: response.data, path: "http://192.168.1.21:3001/uploads/"})
            })
    }

    handleDelete = event => {
        if (confirm("Are you sure to delete this item ?")) {

            Axios
                .delete("http://192.168.1.21:3001/cart/products/" + event, this.state.config)
                .then((response) => {
                    console.log(response.data)
                    this.setState({isDeleted: "Product deleted sucessfully"})

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }



    render() {

       function priceChange(event) {
  
            this.setState({
                Totalprice: event.target.value + this.state.Totalprice
            })
        }
        const {cart} = this.state
        return (
            <div>
                <Navmenu/>
                <Container>
                    <Row>
                        <Col md="8">
                            {cart.length

                                ? (cart.map(carts =>< Card key = {
                                    carts._id
                                } > <Row>
                                    <Col xs="4">
                                        <Card className="addtocartImage">
                                            <img src={this.state.path + carts.image}/>
                                        </Card>
                                    </Col>

                                    <Col xs="8">
                                        <span>{carts.productName}</span>
                                        <hr/>
                                        <span>Price: {carts.price}</span>
                                        <hr/>
                                        <span>Total Quantity: {carts.quantity}</span>
                                        <br/>
                                        <span className="badge badge-primary">Total Price:{carts.price * carts.quantity}</span>
                                        <hr/>
                                        <Link to={`/product/${carts.productId}`}>
                                            <Button renderAs="button" color="warning">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            renderAs="button"
                                            color="danger"
                                            className="m-3"
                                            onClick={(id) => {
                                            this.handleDelete(carts._id)
                                        }}>
                                            Remove
                                        </Button>
                                        <CardBody>

                                            {/* <span>{this.state.grandTotal=this.state.grandTotal+carts.price}</span> */}

                                        </CardBody>
                                    </Col>
                                </Row> 
                                </Card> 
                            )
                  )  
                  :null}
                        </Col>
                        <Col md="4">
                            <Card>
                                    <CardBody>Total Price:{this.priceChange} {this.state.Totalprice}</CardBody>
                                <Card CardBody>
                                <Link to="/checkout">
                                            <Button renderAs="button" color="primary">
                                                Checkout
                                            </Button>

                                        </Link>
                                </Card>
                            </Card>
                        </Col>

                    </Row>

                </Container>
            </div>
        )
    }
}
