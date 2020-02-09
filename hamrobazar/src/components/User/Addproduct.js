import React, {Component} from 'react'

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
import 'react-toastify/dist/ReactToastify.css';
import Usernav from './Usernav';
import SideNavPage from './SideNavPage';

export default class Addproduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productName: '',
            productPrice: '',
            productDescription: '',
            productCondition: '',
            category: '',
            productNameError: '',
            productPriceError: '',
            productDescriptionError: '',
            productConditionError: '',
            categoryError: '',
            selectedFile: '',
            checkValidImage: '',
            redirect: false,
            imageIs:'',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
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
        let productNameError = "";
        let productPriceError = "";
        let productDescriptionError = "";
        let productConditionError = "";
        let categoryError = "";

        if (!this.state.productName) {
            productNameError = "Full name cannot be empty";
        }
        if (!this.state.productPrice) {
            productPriceError = "Product price cannot be empty"
        }
        if (!this.state.productDescription) {
            productDescriptionError = "Product Description cannot be empty"
        }
        if (!this.state.productCondition) {
            productConditionError = "Product Condition cannot be empty"
        }
       if(this.state.productPrice.length >7)
       {
        productPriceError = "Product price exceeds"
       }

        if (productNameError || productPriceError || productDescriptionError || productConditionError || categoryError) {
            this.setState({productNameError, productPriceError, productDescriptionError, productConditionError, categoryError})
            return false;
        }
        return true;
    }

    uploadImage = event => {
        event.preventDefault();
            const fd = new FormData();
            fd.append('imageFile', this.state.selectedFile,this.state.selectedFile.name);
            Axios
                .post('http://192.168.1.21:3001/upload', fd)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        imageIs:res.data.filename });
                    })
                    .catch((err)=>
                    {
                        console.log(err)
                        this.setState({checkValidImage: "Image is not valid"})
                        return;
                    })    

    }

handleSubmit=event=>{
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
        var data = {
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            productDescription: this.state.productDescription,
            productCondition: this.state.productCondition,
            category: this.state.category,
            image: this.state.imageIs
        }
        Axios
            .post('http://192.168.1.21:3001/products',data,this.state.config)
            .then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    this.setState({redirect: true})
                    toast("Sucessfully")
                }

            })
            .catch((err) => {
                console.log(err)
                this.setState({checkValidImage: "Unsucessfull"})
            })
    }
}
    render()
    {
        if (this.state.redirect) {
            return (<Redirect to="/dashboard/myproduct"/>)
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
        }
        return (
<div>
    <SideNavPage/>
    <Usernav/>
            <Container>
                <Col md="6" className="register ">
                    <h1 className="m-2 text-center">Add product</h1>

                    <Form onSubmit={this.handleSubmit}>

                        <FormGroup>

                            <div>
                                <Input
                              
                                    type="file"
                                    inputProps={{
                                    accept: 'image/*'
                                }}
                                    name="avatar"
                                    onChange={this.handleFileSelected}
                                    /> {$imagePreview}

                                
                                   <button onClick={this.uploadImage} >Upload Image</button>
                            </div>
                            {this.state.checkValidImage
                                ? (
                                    <Alert>{this.state.checkValidImage}</Alert>
                                )
                                : null
}
                        </FormGroup>
                        <FormGroup>
                            {/*
                        <Input type="file" className="form-control" onChange={this.handleFileSelected}/> */}

                            <Input
                                type="text"
                                name="productName"
                                className="form-control"
                                value={this.state.productName}
                                onChange={this.handleChange}placeholder="Product Name"/> {this.state.productNameError
                                ? (
                                    <Alert color="danger" size="sm" className="mt-2">
                                        {this.state.productNameError}</Alert>
                                )
                                : null}

                        </FormGroup>
                        <FormGroup>

                            <Input
                                type="number"
                                name="productPrice"
                                className="form-control "
                                value={this.state.productPrice}
                                onChange={this.handleChange}placeholder="Product price"/> {this.state.productPriceError
                                ? (
                                    <Alert color="danger" size="sm" className="mt-2">
                                        {this.state.productPriceError}</Alert>
                                )
                                : null}
                        </FormGroup>
                        <FormGroup>

                            <Input
                                type="text"
                                name="productDescription"
                                className="form-control "
                                value={this.state.productDescription}
                                onChange={this.handleChange}placeholder="Product Description"/> {this.state.productDescriptionError
                                ? (
                                    <Alert color="danger" size="sm" className="mt-2">
                                        {this.state.productDescriptionError}</Alert>
                                )
                                : null}
                        </FormGroup>

                        <FormGroup>

                            <Input
                                type="text"
                                name="productCondition"
                                className="form-control "
                                value={this.state.productCondition}
                                onChange={this.handleChange}placeholder="Product Condition"/> {this.state.productConditionError
                                ? (
                                    <Alert color="danger" size="sm" className="mt-2">
                                        {this.state.productConditionError}</Alert>
                                )
                                : null}
                        </FormGroup>

                        <FormGroup>

                            <Input
                                type="text"
                                name="category"
                                className="form-control "
                                value={this.state.category}
                                onChange={this.handleChange}placeholder="Category"/> {this.state.categoryError
                                ? (
                                    <Alert color="danger" size="sm" className="mt-2">
                                        {this.state.categoryError}</Alert>
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
