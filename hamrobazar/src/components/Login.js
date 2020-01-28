import React, {Component} from 'react'
import {
    Container,
    Form,
    Label,
    FormGroup,
    Input,
    Button,
    FormText,
    Col,
    Alert
} from 'reactstrap'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
            checkError:''

        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        axios
            .post('http://192.168.1.21:3001/users/login', this.state)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
                this.setState({isLoggedIn: true})
            })
            .catch((err) => {
                console.log(err.response)
                this.setState({email: '', password: '',checkError:"Invalid email or password"
            })
            })

    }
    render() {
        if (this.state.isLoggedIn === true) {
            return <Redirect to="/"/>
        }

        return (
            <Container >
                <Col md={6} className="login">
                    <h3 className="text-center m-2">Login Form</h3>

                    {
                        this.state.checkError ? (
                        <Alert>
                            {this.state.checkError}
                        </Alert>)
                        :null
                    }
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label for='email'>Email</Label>
                            <Input
                                name='email'
                                id='email'
                                type='email'
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <Button color='primary' type="submit">Login</Button>
                        <FormText>Not yet a user?
                            <Link to='/register'>Register here!</Link>
                        </FormText>
                    </Form>
                </Col>
            </Container>
        )
    }
}
