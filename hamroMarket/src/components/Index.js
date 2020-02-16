import React, { Component } from 'react'

import { Container, Alert,Card,CardBody,CardTitle,CardSubtitle,Row, CardLink, Button, Input } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Search from './home/Search'
import ImageSlider from './home/ImageSlider'
import Footer from './home/Footer'
import Navmenu from './Navmenu'

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
         <div>
<Navmenu/>
           <Container fluid={true}>
               {/* <ImageSlider/> */}
               <Container>

               <div className="Search">
                    <Input className="searchInput mx-auto"type="search" width="90%" placeholder="Search product"></Input>

            </div>
            <Row>
            {
                posts.length ?
                (posts.map(post=><Card className="col-sm-6 col-md-3" key={post._id}>
               <CardBody >
                <img className="imageResponsive" src={this.state.path + post.image} alt="Card image"/>
                </CardBody>
            <CardBody>
                <CardTitle>{post.productName}</CardTitle>
                <CardSubtitle>Price: Rs.{post.productPrice}</CardSubtitle>
                <Link to={`/product/${post._id}`}>
                            <Button renderAs="button" color="success">
                                View
                            </Button>
                            </Link>

               
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
<Footer/>
</Container>
</div>
        )
    }
}
