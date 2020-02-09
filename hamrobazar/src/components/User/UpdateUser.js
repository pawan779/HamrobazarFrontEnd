import React, {Component} from 'react'
import SideNavPage from './SideNavPage'
import Usernav from './Usernav'
import {
    Container,
    Form,
    Button,
    Input,
    FormGroup,
    Alert,
    Col
} from 'reactstrap'
import Axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


export default class UpdateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            nameError: '',
            address1Error: '',
            address2Error: '',
            address3Error: '',
            phoneError: '',
            mobilePhoneError: '',
            user:'',
            path:'',
            imageIS:'',
            redirect:false
        }
    }

    componentWillMount() {
        Axios
            .get("http://192.168.1.21:3001/users/me", this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({
                    user:response.data,
                    fullName: response.data.fullName,
                    address1: response.data.address1,
                    address2: response.data.address2,
                    address3: response.data.address3,
                    phone: response.data.phone,
                    mobilePhone: response.data.mobilePhone,
                    image: response.data.image,
                    path: 'http://192.168.1.21:3001/uploads/'
                })
            })
    }

    handleChange = event => (this.setState({
        [event.target.name]: event.target.value
    }))

    validate = () => {
        let nameError = "";
        let address1Error = "";
        let address2Error = "";
        let address3Error = "";
        let phoneError = "";
        let mobilePhoneError = "";

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
        if (this.state.phone.length != 10) {
            phoneError = "phone number should be of 10 digit"
        }
        if (this.state.mobilePhone.length != 10) {
            mobilePhoneError = "phone number should be of 10 digit"
        }

        if (nameError || address1Error || address2Error || address3Error || phoneError || mobilePhoneError) {
            this.setState({
                nameError,
                address1Error,
                address2Error,
                address3Error,
                phoneError,
                mobilePhoneError
            })
            return false;
        }
        return true;
    }

    handleFileSelected = event => {
        this.setState({selectedFile: event.target.files[0]})
        //for image url
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({imagePreviewUrl: reader.result});
        }

        reader.readAsDataURL(event.target.files[0])
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
                toast("Image sucessfully updated!!");
             
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
            var data = {
                fullName: this.state.fullName,
                address1: this.state.address1,
                address2: this.state.adress2,
                address3: this.state.adress3,
                phone: this.state.phone,
                mobilePhone:this.state.mobilePhone,
                image: this.state.imageIS
            }
            Axios
                .put('http://192.168.1.21:3001/users/me', data, this.state.config)
                .then((response) => {
                    console.log(response.data)
                    if (response.status == 200) {
                        this.setState({redirect: true})
                        toast("User Details Updated!!")
                    }

                })
                .catch((err) => {
                    console.log(err)
                    this.setState({checkValidImage: "Unsucessfull"})
                    toast("User couldnot be updated")
                })
        }
    }

    render() {
        if(this.state.redirect)
        {
            return(<Redirect to="/dashboard"/>)
        }

       // for image preview
       let $imagePreview = (
        <div className="previewText image-container">Please select an Image for Preview</div>
    );
    if (this.state.imagePreviewUrl) {
        $imagePreview = (
            <div className="image-container text-center"><img src={this.state.imagePreviewUrl} alt="icon" width="200" height="200"/>
            </div>
        );
    } else {
        $imagePreview = (
            <div className="image-container text-center"><img src={this.state.path + this.state.user.image} alt="icon" width="200" height="200"/>
            </div>
        );
    }

        return (
            <div>
                <SideNavPage/>
                <Usernav/>
                   
                <Container>
             

                    <Col md="6" className="register ">
                        <h1 className="m-2 text-center">Register</h1>

                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup>

                                <div>
                                    <Input
                                        type="file"
                                        inputProps={{
                                        accept: 'image/*'
                                    }}
                                        name="avatar"
                                        onChange={this.handleFileSelected}/> {$imagePreview}

                                    <button onClick={this.uploadImage}>Upload Image</button>
                                </div>
                                {this.state.checkValidImage
                                    ? (
                                        <Alert>{this.state.checkValidImage}</Alert>
                                    )
                                    : null
}
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    value={this.state.fullName}
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

                            <Button varient="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Container>
            </div>
        )
    }
}