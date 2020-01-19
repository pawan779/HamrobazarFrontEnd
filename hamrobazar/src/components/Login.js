import React, { Component } from 'react'
import {Container,Form,Label,FormGroup,Input,Button,FormText} from 'reactstrap'
import{Link,Redirect}from 'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Container>
            <h1>Login Form</h1>
            <Form>
                <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input name='username' id='username' type='text'
                        value={this.state.username} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' name='password' id='password'
                        value={this.state.password} onChange={this.handleChange} />
                </FormGroup>
                <Button color='primary' onClick={this.handleClick}>Login!</Button>
                <FormText>Not yet a user? <Link to='/register'>Register here!</Link> </FormText>
            </Form>
        </Container>
        )
    }
}
