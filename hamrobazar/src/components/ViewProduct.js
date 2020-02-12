import React, {Component} from 'react'
import Axios from 'axios'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Container,
    Row,Col, Alert, Input
} from 'reactstrap';
import { Badge } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

export default class ViewProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: '',
            path:'',
            totalQuantity:'1',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
          

        }
    }

    componentWillMount()
    {
        var proID = this.props.match.params.id

        Axios
            .get("http://192.168.1.21:3001/products/" + proID)
            .then((response) => {
                console.log(response.data)
                this.setState({product: response.data, path:"http://192.168.1.21:3001/uploads/",totalQuantity:1})
            })
    }

    handleChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
      
    }

    addQuantity=event=>{
this.setState({
    totalQuantity:this.state.totalQuantity+1
})
console.log(this.state.totalQuantity)
    }

    subQuantity=event=>{
        this.setState({
            totalQuantity:this.state.totalQuantity-1
        })
        console.log(this.state.totalQuantity)
            }

addToCart=event=>{
    var data={
        productId:this.state.product._id,
        quantity:this.state.totalQuantity,
        price:this.state.product.productPrice,
        image:this.state.product.image

    }
    Axios.post("http://192.168.1.21:3001/cart",data,this.state.config)
    .then((response)=>{
        console.log(response.data)
    })
    .catch((err)=>
    {
        console.log(err)
    })
}


    render() {
const {product}=this.state
        return (
            
            <Container>
                <ToastContainer/>
                {product
                    ? (
                    
                        // <Card>
                        <Row>
                          
                            <Col md="6">
                            <Card>
                            <CardImg top width="10%" src={this.state.path+product.image} alt="Card image cap"/>
                            </Card>
                            </Col>
                           
                            <Col md="6">
                                <Card>
                            <CardBody>
                    <CardTitle>{product.productName}</CardTitle>
                    <CardSubtitle>{product.productCondition}</CardSubtitle>
                    <hr/>
                    <CardSubtitle>Rs.{product.productPrice}</CardSubtitle>
                    <hr/>
                    <CardSubtitle>Stock:{product.quantity}</CardSubtitle>
                              
                            <hr/>
                            <Button className="plus" onClick={this.addQuantity}></Button>
                            <input type="number" name="totalQuantity" className="cartInput" value={this.state.totalQuantity} onChange={this.handleChange}/>

                            <Button className="minus" onClick={this.subQuantity}/>

                            {
                                        ((this.state.totalQuantity>product.quantity) || (this.state.totalQuantity<1))
                                        ?(
                                        <span className="badge badge-danger ml-3">Invalid</span>

                                        
                                        ):
                                        <Badge className="badge-success ml-3">Rs:{(product.productPrice*this.state.totalQuantity)}</Badge>
                                
                                    }


                            </CardBody>

                         
                            <CardBody>
                                {
                                      ((this.state.totalQuantity>product.quantity) || (this.state.totalQuantity<1))
                                      ?
                                      (
                                        <Button renderAs="button"className="mr-sm-2" color="danger">
                                        Add to Cart
                                    </Button>
                                      )
                                      :
                                      (    <Button renderAs="button"className="mr-sm-2" color="warning" onClick={this.addToCart}>
                                      Add to Cart
                                  </Button>)

                                }
                        
                        
                             <hr/>
                                <Button>Add to wishList</Button>
                            </CardBody>
                            </Card>
                            </Col>
                        {/* // </Card> */}
                            <Col md="12">                 
                            <Card>
                            <CardBody>
                            <h5>Description</h5>
                            <CardSubtitle>{product.productDescription}</CardSubtitle>
                           </CardBody>
                            </Card>
                            </Col>
                            </Row>
                    )
                    : <Alert color="warning">No product selected</Alert>
            }
           
             </Container>
             
        )
    }
}
