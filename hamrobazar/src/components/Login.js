import React, { Component } from 'react'
import {Container,Form,Label,FormGroup,Input,Button,FormText,Col} from 'reactstrap'
import{Link}from 'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Container >
                <Col md={6} className="login">
            <h3 className="text-center m-2">Login Form</h3>
            <Form>
                <FormGroup>
                    <Label for='Email'>Email</Label>
                    <Input name='Email' id='Email' type='text'
                        value={this.state.Email} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' name='password' id='password'
                        value={this.state.password} onChange={this.handleChange} />
                </FormGroup>
                <Button color='primary' onClick={this.handleClick}>Login!</Button>
                <FormText>Not yet a user? <Link to='/register'>Register here!</Link> </FormText>
            </Form>
            </Col>
        </Container>
        )
    }
}
