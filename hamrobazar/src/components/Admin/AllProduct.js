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
    Table,
    Button,
    Input
} from 'reactstrap'
import {Link, Redirect} from 'react-router-dom'
import SideNavPage from './SideNavPage'
import Adminnav from './Adminnav'
import { toast } from 'react-toastify'

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
            productID:'',
            userID:'',
            redirect:false
        }
    }

 

    componentDidMount() {
        Axios
            .get("http://192.168.1.21:3001/admin/products",this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({products: response.data, path: 'http://192.168.1.21:3001/uploads/',userID:response.data.user})
            })

    }


    render() {

    

        const {products} = this.state
        return (
            <div>
                <SideNavPage/>
                <Adminnav/>
            <Container>
    <Table className="table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                  
                                    <th>Status</th>
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
                                     <td> {
                                            product.isVerified===true ?
                                            (<label color="success">Verified</label> )
                                            :(<label color="warning" value={product._id} onClick={this.verifyProduct}>Verfy this</label>)
                                        }</td>
                                    <td>

                                   
                        <Link to={`/admin/product/verifyproduct/${product._id}`}>
                            <Button renderAs="button" color="warning">
                                View Details
                            </Button>
                            </Link>
                       

                                    </td>
                                    </tr>
   

                              
                         

                        </tbody>
                        
                        )
                        
                        )
                        
                
                        :null

                          
                }
                
            </Table>
            </Container>
            </div>
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