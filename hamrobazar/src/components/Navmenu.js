import React, {Component} from 'react'
import {
    Navbar,
    Nav,
    Button
} from "react-bootstrap";
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Navmenu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:{},
             config:{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`},
             login:''
            }
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:3001/users/me', this.state.config)
        .then((response)=>{
            this.setState({
                user:response.data
            })
        })
        .catch((err)=>{
            this.setState({
                login:'Login'
            })
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
                        <Nav className="mr-auto">

                            <Nav.Link className="text-light"as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className="text-light"as={Link} to="/about">About</Nav.Link>
                            <Nav.Link className="text-light"as={Link} to="/contact">Contact</Nav.Link>
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About Us</Nav.Link> */}
                            {/* <NavDropdown title="Dro</Nav.Link>pdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown> */}
                        </Nav>
{
    this.state.user ?(
        <Button as={Link} to="/" className="mr-sm-2 btn btn-dark">{this.state.user.fullName}
        </Button>
    )
    : <Button as={Link} to="/login" className="mr-sm-2 btn btn-dark">{this.state.login}
    </Button>
}
                       

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
