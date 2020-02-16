import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';

export default class Logout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            navigate: false
        }
    }
    componentWillMount()
    {
        localStorage.clear("token", "user", "admin");
        this.setState({navigate: true})
    }

    render() {
        const {navigate} = this.state;

        if (navigate) {
            return <Redirect to="/" push={true}/>;
        }
    }
}
