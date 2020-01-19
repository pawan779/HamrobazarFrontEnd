import React, {Component} from 'react'

import {Container,Form,Button,Input,FormGroup} from 'reactstrap'
import Axios from 'axios'
import {Link,Redirect} from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             fullName:'',
             address1:'',
             email:'',
             password:'',
             redirect:false
        }
    }
    handleChange=event=>(
        this.setState({
            [event.target.name]:event.target.value
        })
    )


    handleSubmit=event=>{
      event.preventDefault();

      var headers={
          'Content-Type':'application/json'
      }
      var data={
          fullName:this.state.fullName,
          address1:this.state.address1,
          email:this.state.email,
          password:this.state.password
      }
            
      Axios.post('http://192.168.1.21:3001/users/register',data,headers)
      .then((response)=>{
          console.log(response)
          if(response.status==200)
          {
              this.setState({redirect:true})
          }
        
          }).catch((err)=>{
              console.log(err)
          })
    }
    render()
     {
        if(this.state.redirect)
        {
                return (<Redirect to="/login"/>)
        }

        return (
           
            <Container>
                <h1 className="">Register</h1>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>

                        <Input
                         type="text" name="fullName" className="form-control" value={this.state.fname} onChange={this.handleChange}placeholder="Full Name"/>
                    </FormGroup>
                    <FormGroup>

                        <Input
                         type="text" name="address1" className="form-control" value={this.state.address} onChange={this.handleChange}placeholder="Address"/>
                    </FormGroup>
                    <FormGroup>

                        <Input
                         type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleChange}placeholder="Email"/>
                    </FormGroup>
                    <FormGroup>

                        <Input
                         type="Password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange}placeholder="Password"/>
                    </FormGroup>

                    <Button varient="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}
export default Register