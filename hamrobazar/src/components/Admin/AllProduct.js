import React, {Component} from 'react'
import Axios from 'axios'
import {Container, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'

export default class AllProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            products: {},
            path: ''
        }
    }

    componentDidMount() {
        Axios
            .get("http://192.168.1.21:3001/products")
            .then((response) => {
                console.log(response.data)
                this.setState({products: response.data, path: 'http://192.168.1.21:3001/uploads/'})
            })

    }

    render() {
        const {products} = this.state
        return (
            <Container>

                <Row>
                {products.length
                    ? (products.map(product =>< Col sm="6" md="4" key = {
                        product._id
                    } >
                         <Card>
                        <CardBody>
                        <img width="20%" src={this.state.path+product.image} alt="Card image"/>
                        </CardBody>
                      
                        <CardBody>
                        <CardTitle>{product.productName}</CardTitle>
                        <CardSubtitle>{product.productCondition}</CardSubtitle>
                            <CardSubtitle>Price: Rs.{product.productPrice}</CardSubtitle>

                <CardText>{product.productDescription}</CardText>
                           <CardLink className="btn btn-primary"> <Link className="text-light" to="/admin/dashboard//product/verifyproduct">Edit</Link></CardLink>
                           <CardLink className="btn btn-danger"> <Link className="text-light" to="/admin/dashboard/myproduct">Delete</Link></CardLink>
                        </CardBody>
                    </Card>
                    </Col>
                     
                            )

                    )
                    :null
                }
</Row>
            </Container>
        )
    }
}
