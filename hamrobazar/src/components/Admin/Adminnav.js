import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    Button
} from "react-bootstrap";
    import {Link} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Adminnav extends Component {
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
                        <Nav.Link className="text-light"as={Link} to="/admin/dashboard/myproduct">My Product</Nav.Link>
                    </Nav>
                   

                </Navbar.Collapse>
            </Navbar>

            <ToastContainer/>
        </div>
        )
    }
}
