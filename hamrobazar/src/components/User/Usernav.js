import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    Button
} from "react-bootstrap";
    import {Link} from 'react-router-dom'
import axios from 'axios'
export default class Usernav extends Component {
    render() {
        
        return (
            <div>
            <Navbar bg="light" id="dashboardNavbar" expand="sm">
                <Navbar.Brand>
                    <Nav.Link as={Link} to="/" className="text-dark"></Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link className="text-light"as={Link} to="/dashboard">User Dashboard</Nav.Link>
                        <Nav.Link className="text-light"as={Link} to="/dashboard/product">Add Product</Nav.Link>
                        <Nav.Link className="text-light"as={Link} to="/dashboard/myproduct">My Product</Nav.Link>
                    </Nav>
                   

                </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }
}
