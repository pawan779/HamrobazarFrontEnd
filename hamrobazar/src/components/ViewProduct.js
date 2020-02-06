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
    Row,Col, Alert
} from 'reactstrap';

export default class ViewProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: '',
            path:'',
          

        }
    }

    componentWillMount()
    {
        var proID = this.props.match.params.id

        Axios
            .get("http://localhost:3001/products/" + proID)
            .then((response) => {
                console.log(response.data)
                this.setState({product: response.data, path:"http://localhost:3001/uploads/"})
            })
    }

    render() {
const {product}=this.state
        return (
            <Container>
            
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
                              
                            </CardBody>
                            <CardBody>
                                <Button>Add to cart</Button>
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
