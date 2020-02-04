import React, {Component} from 'react'
import Axios from 'axios'
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Table
} from 'reactstrap'
import {Link} from 'react-router-dom'

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
            path: '',
            name:'',
            userID:''
        }
    }

 

    componentDidMount() {
        Axios
            .get("http://192.168.1.21:3001/products")
            .then((response) => {
                console.log(response.data)
                this.setState({products: response.data, path: 'http://192.168.1.21:3001/uploads/',userID:response.data.user})
            })

    }
    userHandle(){
        Axios.get("http://192.168.1.21:3000/users/my/:id",this.state.userID,this.state.config)
        .then(response=>{
            console.log(response.data)
            this.setState({name:response.data.fullName})
        })
    }

    render() {
        const {products} = this.state
        return (
            <Container>
    <Table className="table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Condition</th>
                                    <th>User</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                    {products.length
                        ? (products.map(product =><tbody key = {
                            product._id
                        } > 
                    
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{product.productName}</td>
                                    <td><img src={this.state.path + product.image}width="30%"/></td>
                    <td>{product.productPrice}</td>
                    <td>{product.productCondition}</td>
    <td>{this.state.name}</td>
    <td>{product.productDescription}</td>

                                    </tr>

                              
                         

                        </tbody>
                        ))
                        :null
                }
              

            }
            </Table>
            </Container>
        )
    }
}

// <Card> <CardBody> <img width="20%" src={this.state.path+product.image}
// alt="Card image"/> </CardBody> <CardBody>
// <CardTitle>{product.productName}</CardTitle>
// <CardSubtitle>{product.productCondition}</CardSubtitle>
// <CardSubtitle>Price: Rs.{product.productPrice}</CardSubtitle>
// <CardText>{product.productDescription}</CardText>    <CardLink className="btn
// btn-primary" onClick={()=>
// this.props.handleEdit(product._id)}>Edit</CardLink>    <CardLink
// className="btn btn-danger"> <Link className="text-light"
// to="/admin/dashboard/myproduct">Delete</Link></CardLink> </CardBody> </Card>