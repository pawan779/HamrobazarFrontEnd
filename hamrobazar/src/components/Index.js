import React, { Component } from 'react'

import { Container, Alert,Card,CardBody,CardTitle,CardSubtitle,Row } from 'reactstrap'
import axios from 'axios'

export default class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts:[],
             path:'',
             serverError:""
        }
    }
    componentDidMount()
    {
        // fro latest 6 products
        axios.get("http://localhost:3001/products/latest")
        .then((response)=>{
            console.log(response)
            this.setState({posts:response.data,
            path:'http://localhost:3001/uploads/'})
        })
       
        .catch(err=>{
            console.log(err)
            this.setState({serverError:"No connection to the server"})

        })
    }
    
    render() {
          //this.state.posts
          const{posts}=this.state
        return (
         
            <Container>
            <Row>
            {
                posts.length ?
                (posts.map(post=><Card className="col-sm-6 col-md-4" key={post._id}>
               <CardBody>
                <img width="20%" src={this.state.path + post.image} alt="Card image"/>
                </CardBody>
            <CardBody>
                <CardTitle>{post.productName}</CardTitle>
                <CardSubtitle>Price: Rs.{post.productPrice}</CardSubtitle>
                {/* <CardLink className="btnbtn-primary" value={product._id}
                    onClick={this.handleEdit}>Edit</CardLink>
                <CardLink className="btn btn-danger">
                    <Link className="text-light" to="/admin/dashboard/myproduct">Delete</Link>
                </CardLink> */}
            </CardBody>
            </Card>
                ))
:(<Alert color="warning">No product found</Alert>)
}
</Row>            
</Container>
        )
    }
}
