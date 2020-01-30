import React, { Component } from 'react'

import { Container } from 'reactstrap'
import axios from 'axios'

export default class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts:[],
             path:''
        }
    }
    componentDidMount()
    {
        axios.get("http://192.168.1.21:3001/products")
        .then(res=>{
            console.log(res)
            this.setState({posts:res.data,
            path:'http://192.168.1.21:3001/uploads/'})
        })
       
        .catch(err=>{
            console.log(err)
        })
    }
    
    render() {
          //this.state.posts
          const{posts}=this.state
        return (
          <Container>
              <h1 className="text-center">Welcome to Hamrobazar </h1>
              <div>
                {
                    posts.length ?
                    posts.map(post=> <div key={post._id}>{post.productName}{post.productPrice}{post.image} {post.createdAt}
                    <img src={this.state.path+post.image}></img>
                    </div>)
                    :null
                }
            </div>
          </Container>
        )
    }
}
