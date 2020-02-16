import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    Button,
    NavDropdown
} from "react-bootstrap";
    import {Link} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Adminnav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
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
            <Navbar bg="light" id="adminNavbar" expand="sm">
                <Navbar.Brand>
                    <Nav.Link></Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link className="text-light"as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
                        <Nav.Link className="text-light"as={Link} to="/admin/dashboard/product">All Products</Nav.Link>
                        <Nav.Link className="text-light"as={Link} to="/admin/dashboard/category">Category</Nav.Link>
                        <Nav.Link className="text-light"as={Link} to="/admin/dashboard/users">User Details</Nav.Link>
                    </Nav>
                    {this.state.loggedIn
                            ? (

                                <NavDropdown
                                    title=" admin "
                                    className="mr-sm-4 bg-light"
                                    id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/dashboard/product">All Products</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/dashboard/category">Add Category</NavDropdown.Item>
                                   
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

            <ToastContainer/>
        </div>
        )
    }
}
