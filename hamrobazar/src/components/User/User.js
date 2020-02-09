import React, {Component} from 'react'
import Axios from 'axios'
import {
    Form,
    Container,
    Alert,
    Row,
    Card,
    CardImg,
    CardHeader,
    CardBody,
    CardSubtitle,
    CardLink,
    Button
} from 'reactstrap'
import Dashboard from './Dashboard'
import Usernav from './Usernav'
import SideNavPage from './SideNavPage'
import {Link} from 'react-router-dom'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: {},
            path: '',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        }
    }

    componentDidMount() {
        Axios
            .get('http://192.168.1.21:3001/users/me', this.state.config)
            .then((response) => {
                console.log(response)
                this
                    .setState({users: response.data, path: "http://192.168.1.21:3001/uploads/"})
                    .catch(err => {
                        console.log(err)
                    })

            })
    }

    render() {

        const {users} = this.state

        return (
            <div>
                <SideNavPage/>
                <Usernav/>

                <Container>
                    <Row>
                        <CardHeader className="col-md-6 mx-auto">
                            <div className="imageResponsive mx-auto">
                                <CardImg src={this.state.path + users.image}/>
                            </div>

                            <CardBody>
                                <CardHeader>Full Name: {users.fullName}</CardHeader>
                                <CardHeader>Address: {users.address1}, {users.address2}, {users.address3}</CardHeader>
                                <CardHeader>Phone Number: {users.phone}</CardHeader>
                                <CardHeader>Mobile Number{users.mobilePhone}</CardHeader>
                                <CardHeader>Email Address: {users.email}</CardHeader>
                                <CardBody className="text-center">
                                    <CardLink>
                                        <Link to={`/dashboard/users/${users._id}`}>
                                            <Button renderAs="button" color="warning">
                                                Update Profile
                                            </Button>
                                        </Link>
                                    </CardLink>
                                    <CardLink>
                                        <Link to={`/dashboard/product/my/`}>
                                            <Button renderAs="button" color="secondary">
                                                Update Password
                                            </Button>
                                        </Link>
                                    </CardLink>
                                </CardBody>
                            </CardBody>
                        </CardHeader>

                    </Row>

                </Container>
            </div>
        )
    }
}
