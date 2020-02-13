import React, {Component} from 'react'

import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'
import Navmenu from './Navmenu'
import {
    Container,
    Row,
    Col,
    Input,
    FormGroup,
    Alert,
    Button,
    CardTitle,
    CardSubtitle,
    CardBody
} from 'reactstrap'
import {Form, Card} from 'react-bootstrap'
import { toast } from 'react-toastify'


export default class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cart: '',
            user: '',
            address1: '',
            address2: '',
            address3: '',
            product: '',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            change: false

        }
    }
    componentWillMount() {
        var id = this.props.match.params.id;
        Axios
            .get("http://192.168.1.21:3001/buy/" + id, this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({
                    product:response.data.products
                })
            })
        Axios
            .get("http://192.168.1.21:3001/users/me", this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({user: response.data, address1: response.data.address1, address2: response.data.address2, address3: response.data.address3})
            })
    }

    handleChange = event => (this.setState({
        [event.target.name]: event.target.value
    }))

    changeAddress = event => {
        this.setState({change: true})
    }

    render() {

        {
            this.state.product ?
          (
                product.map(products=><div key={products._id}>

                </div>)
          )
          :null
        }

        async function handleToken(token) {
            console.log(token)

           const response= await Axios.post("http://192.168.1.21:3001/checkout",{
                token,
                product
                
            });
                const {status}=response.data
                {
                    if(status=='success')
                    {
                       toast("Sucessfully order the product" ,
                       {type:'success'})

                       Axios.post("http://192.168.1.21:3001/orders")
                    }
                    else{
                        toast("Something went wrong",
                            {type:'error'}
                        )
                    }
                }
            
        }
        const {product} = this.state
        return (
            <div>
                <Navmenu/>

                <Container>
                    <Row>
                        <Col md="6">

                            <h4>Shipping Address</h4>
                            <Button className="btn btn-warning m-3" onClick={this.changeAddress}>
                                Change Address
                            </Button>

                            {this.state.change
                                ? (
                                    <Form>

                                        <FormGroup>

                                            <Input
                                                type="text"
                                                name="address1"
                                                className="form-control "
                                                value={this.state.address1}
                                                onChange={this.handleChange}placeholder="Address"/> {this.state.address1Error
                                                ? (
                                                    <Alert color="danger" size="sm" className="mt-2">
                                                        {this.state.address1Error}</Alert>
                                                )
                                                : null}
                                        </FormGroup>

                                        <FormGroup>

                                            <Input
                                                type="text"
                                                name="address2"
                                                className="form-control "
                                                value={this.state.address2}
                                                onChange={this.handleChange}placeholder="Address2"/> {this.state.address2Error
                                                ? (
                                                    <Alert color="danger" size="sm" className="mt-2">
                                                        {this.state.address2Error}</Alert>
                                                )
                                                : null}
                                        </FormGroup>

                                        <FormGroup>

                                            <Input
                                                type="text"
                                                name="address3"
                                                className="form-control "
                                                value={this.state.address3}
                                                onChange={this.handleChange}placeholder="Address3"/> {this.state.address3Error
                                                ? (
                                                    <Alert color="danger" size="sm" className="mt-2">
                                                        {this.state.address3Error}</Alert>
                                                )
                                                : null}
                                        </FormGroup>
                                    </Form>
                                )
                                : <Form>
                                    <FormGroup>

                                        <Input
                                            type="text"
                                            name="address1"
                                            className="form-control "
                                            value={this.state.address1}
                                            placeholder="Address"
                                            readOnly/>
                                    </FormGroup>

                                    <FormGroup>

                                        <Input
                                            type="text"
                                            name="address2"
                                            className="form-control "
                                            value={this.state.address2}
                                            placeholder="Address2"
                                            readOnly/>
                                    </FormGroup>

                                    <FormGroup>

                                        <Input
                                            type="text"
                                            name="address3"
                                            className="form-control "
                                            value={this.state.address3}
                                            placeholder="Address3"
                                            readOnly/>
                                    </FormGroup>
                                </Form>
}

                        </Col>

                        <Col md="6">
                            {product.length
                                ? (product.map(product =>< div key = {
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
                                    </Card> 
                                                  <hr/>

                            <Button color="success">Chash on Delivery</Button>
                            <hr/>
                            {
                               
                                    <StripeCheckout
                                    stripeKey="pk_test_mOUfpxsf7uHArKmrOzVHLXu700t9B02FOq"
                                    token={handleToken}
                                    amount={product.total}
                                    name={this.state.user.fullName}

                                    />
                             
                            }
                         
                         </div>)
                    )
                    : <span color="warning">No product found</span >
}
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}
