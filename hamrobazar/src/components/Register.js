import React, {Component} from 'react'

import {
    Container,
    Form,
    Button,
    Input,
    FormGroup,
    Alert,
    Col,
    Row
} from 'reactstrap'
import Axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullName: '',
            address1: '',
            address2: '',
            address3: '',
            phone: '',
            mobilePhone: '',
            email: '',
            password: '',
            nameError: '',
            address1Error: '',
            address2Error: '',
            address3Error: '',
            phoneError: '',
            mobilePhoneError: '',
            emailError: '',
            passwordError: '',
            selectedFile: '',
            checkValidImage: '',
            loggedIn: false,
            imageIS: '',
            redirect: false
        }
    }
    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({redirect: true})
        }
    }

    handleChange = event => (this.setState({
        [event.target.name]: event.target.value
    }))

    handleFileSelected = event => {
        this.setState({selectedFile: event.target.files[0]})
        //for image url
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({imagePreviewUrl: reader.result});
        }

        reader.readAsDataURL(event.target.files[0])
    }

    validate = () => {
        let nameError = "";
        let address1Error = "";
        let address2Error = "";
        let address3Error = "";
        let phoneError = "";
        let mobilePhoneError = "";
        let emailError = "";
        let passwordError = "";

        if (!this.state.fullName) {
            nameError = "Full name cannot be empty";
        }
        if (!this.state.address1) {
            address1Error = "Address 1 cannot be empty"
        }
        if (!this.state.address2) {
            address2Error = "Address 2 cannot be empty"
        }
        if (!this.state.address3) {
            address3Error = "Address 3 cannot be empty"
        }
        if (this.state.mobilePhone.length != 10) {
            mobilePhoneError = "Mobile phone number should be of 10 digit"
        }
        if (!this.state.email.includes("@")) {
            emailError = "invalid email"
        }
        if (this.state.password.length < 6) {
            passwordError = "Password should be greater than 6"
        }
        if (nameError || address1Error || address2Error || address3Error || phoneError || mobilePhoneError || emailError || passwordError) {
            this.setState({
                nameError,
                address1Error,
                address2Error,
                address3Error,
                phoneError,
                mobilePhoneError,
                emailError,
                passwordError
            })
            return false;
        }
        return true;
    }

    uploadImage = event => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('imageFile', this.state.selectedFile, this.state.selectedFile.name);
        Axios
            .post('http://192.168.1.21:3001/upload', fd)
            .then((res) => {
                console.log(res);
                this.setState({imageIS: res.data.filename});
                toast("Image sucessfully uploaded!!");

            })
            .catch((err) => {
                console.log(err)
                this.setState({checkValidImage: "Image is not valid"})
                return;
            })

    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {

            var headers = {
                'Content-Type': 'application/json'
            }

            var data = {
                fullName: this.state.fullName,
                address1: this.state.address1,
                address2: this.state.adress2,
                address3: this.state.adress3,
                phone: this.state.phone,
                mobilePhone: this.state.mobilePhone,
                email: this.state.email,
                password: this.state.password,
                image: this.state.imageIS
            }
            Axios
                .post('http://192.168.1.21:3001/users/register', data, headers)
                .then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        this.setState({loggedIn: true})
                    }
                    toast("Register sucessfull")

                })
                .catch((err) => {
                    console.log(err)

                })

        }
    }
    render()
    {
        if (this.state.redirect) {
            return (<Redirect to="/"/>)
        }

        if (this.state.loggedIn) {
            return (<Redirect to="/login"/>)
        }

        // for image preview
        let $imagePreview = (
            <label htmlFor="previewImage" className="previewText image-container"></label>
        );
        if (this.state.imagePreviewUrl) {
            $imagePreview = (
                <label htmlFor="previewImage" className="image-container text-center"><img src={this.state.imagePreviewUrl} alt="icon" width="200" height="200"/>
                </label>
            );
        }
        return (
            <div className="product ">
                <Container>
                    <ToastContainer/>
                    <h1 className="m-2 text-center">Register</h1>

                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md="4" sm="6">

                                <FormGroup>

                                    <div>
                                        <input
                                            style={{
                                            display: 'none'
                                        }}
                                            type="file"
                                            inputProps={{
                                            accept: 'image/*'
                                        }}
                                            id="previewImage"
                                            name="avatar"
                                            onChange={this.handleFileSelected}
                                            ref={fileInput => this.fileInput = fileInput}/> {$imagePreview}
                                    </div>
                                    <div className="text-center mt-2">
                                        <Button onClick={this.uploadImage} color="dark">Upload Image</Button>
                                    </div>
                                    {this.state.checkValidImage
                                        ? (
                                            <Alert>{this.state.checkValidImage}</Alert>
                                        )
                                        : null
}
                                </FormGroup>
                            </Col>
                            <Col md="8" sm="6">
                                <FormGroup>
                                    {/*
                        <Input type="file" className="form-control" onChange={this.handleFileSelected}/> */}

                                    <Input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        value={this.state.fname}
                                        onChange={this.handleChange}placeholder="Full Name"/> {this.state.nameError
                                        ? (
                                            <Alert color="danger" size="sm" className="mt-2">
                                                {this.state.nameError}</Alert>
                                        )
                                        : null}

                                </FormGroup>
                                <FormGroup>

                                    <Input
                                        type="text"
                                        name="address1"
                                        className="form-control "
                                        value={this.state.address1}
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
                                        name="address2"
                                        className="form-control "
                                        value={this.state.address2}
                                        onChange={this.handleChange}placeholder="Address2"/> {this.state.address2Error
                                        ? (
                                            <Alert color="danger" size="sm" className="mt-2">
                                                {this.state.address2Error}</Alert>
                                        )
                                        : null}
                                </FormGroup>

                                <FormGroup>
                                    <FormGroup>

                                        <Input
                                            type="text"
                                            name="address3"
                                            className="form-control "
                                            value={this.state.address3}
                                            onChange={this.handleChange}placeholder="Address3"/> {this.state.address3Error
                                            ? (
                                                <Alert color="danger" size="sm" className="mt-2">
                                                    {this.state.address3Error}</Alert>
                                            )
                                            : null}
                                    </FormGroup>

                                    <FormGroup>

                                        <Input
                                            type="text"
                                            name="phone"
                                            className="form-control "
                                            value={this.state.phone}
                                            onChange={this.handleChange}placeholder="Phone Number"/> {this.state.phoneError
                                            ? (
                                                <Alert color="danger" size="sm" className="mt-2">
                                                    {this.state.phoneError}</Alert>
                                            )
                                            : null}
                                    </FormGroup>

                                    <FormGroup>

                                        <Input
                                            type="text"
                                            name="mobilePhone"
                                            className="form-control "
                                            value={this.state.mobilePhone}
                                            onChange={this.handleChange}placeholder="Mobile Number"/> {this.state.mobilePhoneError
                                            ? (
                                                <Alert color="danger" size="sm" className="mt-2">
                                                    {this.state.mobilePhoneError}</Alert>
                                            )
                                            : null}
                                    </FormGroup>

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

                                <Button color="primary" type="submit">Register</Button>

                            </Col>
                        </Row>
                    </Form>

                </Container>
            </div>
        )
    }
}
export default Register
