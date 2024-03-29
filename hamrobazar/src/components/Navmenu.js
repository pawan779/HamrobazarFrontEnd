import React, {Component} from 'react'
import {Navbar, Nav, Button, NavDropdown} from "react-bootstrap";
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import Login from './Login';

export default class Navmenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            loggedIn:false,
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
               
            }
        }
    }

    componentWillMount() {
        axios
            .get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                this.setState({user: response.data,loggedIn:true})
            })
            .catch((err) => {
                // this.setState({login: 'Login'})
            })
    }
    render() {
        return (
            <div>
                <Navbar bg="light" id="Navbar" expand="sm">
                    <Navbar.Brand>
                        <Nav.Link as={Link} to="/" className="text-dark">Hamrobazar</Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto navbar-list">

                            <Nav.Link className="text-light" activeClassName='active' as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className="text-light" activeClassName='active' as={Link} to="/about">About</Nav.Link>
                            <Nav.Link className="text-light" activeClassName='active' as={Link} to="/contact">Contact</Nav.Link>

                        </Nav>
                       
                        {this.state.loggedIn
                            ? (

                                <NavDropdown
                                    title={this.state.user.fullName}
                                    className="mr-sm-2 bg-light"
                                    id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/dashboard/product">Add Product</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/dashboard/product">My Product</NavDropdown.Item>
                                   
                                </NavDropdown>
                            )
                            :  <Link to="/login">
                            <Button renderAs="button" color="primary">
                                Login
                            </Button>
                            </Link>
}

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
