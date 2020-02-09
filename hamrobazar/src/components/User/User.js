import React, {Component} from 'react'
import Axios from 'axios'
import {Form, Container, Alert} from 'reactstrap'
import Dashboard from './Dashboard'
import Usernav from './Usernav'

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
        //this.state.posts

        return (
            <div>
                <Usernav/>
                <Container>

                    <div>
                        <div>{this.state.users.fullName}</div>
                        <div>{this.state.users.address1}</div>
                        <div>{this.state.users.phone}</div>
                        <div>{this.state.users.mphone}</div>
                        <div>{this.state.users.email}</div>

                    </div>
                </Container>
            </div>
        )
    }
}
