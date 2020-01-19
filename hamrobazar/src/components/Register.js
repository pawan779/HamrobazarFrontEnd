import React, {Component} from 'react'

import {
    Container,
    Form,
    Button,
    Input,
    FormGroup,
    Alert
} from 'reactstrap'
import Axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullName: '',
            address1: '',
            email: '',
            password: '',
            nameError: '',
            address1Error: '',
            emailError: '',
            passwordError: '',
            selectedFile: '',
            redirect: false
        }
    }
    handleChange = event => (this.setState({
        [event.target.name]: event.target.value
    }))

    handleFileSelected = event => {
        this.setState({selectedFile: event.target.files[0]})
        let reader = new FileReader();
     
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });
        }
     
        reader.readAsDataURL(event.target.files[0])
    }

    validate = () => {
        let nameError = "";
        let address1Error = "";
        let emailError = "";
        let passwordError = "";

        if (!this.state.fullName) {
            nameError = "Full name cannot be empty";
        }
        if (!this.state.address1) {
            address1Error = "Address 1 cannot be empty"
        }
        if (!this.state.email.includes("@")) {
            emailError = "invalid email"
        }
        if (this.state.password.length < 6) {
            passwordError = "Password should be greater than 6"
        }
        if (nameError || address1Error || emailError || passwordError) {
            this.setState({nameError, address1Error, emailError, passwordError})
            return false;
        }
        return true;
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {

            var headers = {
                'Content-Type': 'application/json'
            }
            const reader=new FileReader();
            const url=reader.readAsDataURL(this.state.selectedFile.name);

            const newName = new Date().getTime() + this.state.selectedFile.name
            const fd = new FormData();
            fd.append('imageFile', this.state.selectedFile, this.state.selectedFile.name);
            Axios
                .post('http://192.168.1.21:3001/upload', fd)
                .then(res => {
                    console.log(res);
                })
            var data = {
                fullName: this.state.fullName,
                address1: this.state.address1,
                email: this.state.email,
                password: this.state.password,
                image: 'imageFile-' + this.state.selectedFile.name
            }
            Axios
                .post('http://192.168.1.21:3001/users/register', data, headers)
                .then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        this.setState({redirect: true})
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    render()
    {
        if (this.state.redirect) {
            return (<Redirect to="/login"/>)
        }

        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
        if (this.state.imagePreviewUrl) {
          $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
        }
        return (

            <Container>
                <h1 className="">Register</h1>

                <Form onSubmit={this.handleSubmit}>

              
                    <FormGroup>

                    <div className="App">
         <input type="file" name="avatar" onChange={this.handleFileSelected} />
         { $imagePreview }
      </div>


                        {/* <Input type="file" className="form-control" onChange={this.handleFileSelected}/>
                        <Input
                        ref="file"
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={this.state.fname}
                            onChange={this.handleChange}placeholder="Full Name"/> {this.state.nameError
                            ? (
                                <Alert color="danger" size="sm" className="mt-2">
                                    {this.state.nameError}</Alert>
                            )
                            : null} */}

                    </FormGroup>
                    <FormGroup>

                        <Input
                            type="text"
                            name="address1"
                            className="form-control "
                            value={this.state.address}
                            onChange={this.handleChange}placeholder="Address"/> {this.state.address1Error
                            ? (
                                <Alert color="danger" size="sm" className="mt-2">
                                    {this.state.address1Error}</Alert>
                            )
                            : null}
                    </FormGroup>
                    <FormGroup>

                        <Input
                            type="text"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleChange}placeholder="Email"/> {this.state.emailError
                            ? (
                                <Alert color="danger" size="sm" className="mt-2">
                                    {this.state.emailError}</Alert>
                            )
                            : null}
                    </FormGroup>
                    <FormGroup>

                        <Input
                            type="Password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleChange}placeholder="Password"/> {this.state.passwordError
                            ? (
                                <Alert color="danger" size="sm" className="mt-2">
                                    {this.state.passwordError}</Alert>
                            )
                            : null}
                    </FormGroup>

                    <Button varient="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}
export default Register