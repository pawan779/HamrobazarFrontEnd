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

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Usernav from './Usernav';
import SideNavPage from './SideNavPage';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Footer from '../home/Footer';

export default class Addproduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productName: '',
            productPrice: '',
            productDescription: '',
            productCondition: '',
            quantity:'',
            category: '',
            productNameError: '',
            productPriceError: '',
            productDescriptionError: '',
            quantityError:'',
            productConditionError: '',
            categoryError: '',
            selectedFile: '',
            checkValidImage: '',
            redirect: false,
            imageIs: '',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            cat: ''
        }
    }

    componentWillMount() {
        Axios
            .get("http://localhost:3001/category", this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({cat: response.data})
            })
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
        let quantityError=""

        if (!this.state.productName) {
            productNameError = "Title name cannot be empty";
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
        if (this.state.productPrice.length > 7) {
            productPriceError = "Product price exceeds"
        }
        if (!this.state.productPrice) {
            productPriceError = "Product price cannot be empty"
        } if (!this.state.quantity) {
            productPriceError = "Quantity cannot be empty"
        }
        if (this.state.productPrice.includes("-")) {
            productPriceError = "Invalid price"
        }
        if (this.state.quantity.includes("-")) {
            quantityError = "Invalid quantity"
        }
        if (productNameError || productPriceError || productDescriptionError || productConditionError || categoryError|| quantityError) {
            this.setState({productNameError, productPriceError, productDescriptionError,productNameError,quantityError, productConditionError, categoryError})
            return false;
        }
        return true;
    }

    uploadImage = event => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('imageFile', this.state.selectedFile, this.state.selectedFile.name);
        Axios
            .post('http://localhost:3001/upload', fd)
            .then((res) => {
                console.log(res);
                this.setState({imageIs: res.data.filename});
                toast("Image Uploaded!!")
            })
            .catch((err) => {
                console.log(err)
                this.setState({checkValidImage: "Image is not valid"})
                toast("Invalid Image")
                return;
            })

    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            var data = {
                productName: this.state.productName,
                productPrice: this.state.productPrice,
                productDescription: this.state.productDescription,
                productCondition: this.state.productCondition,
                quantity:this.state.quantity,
                category: this.state.category,
                image: this.state.imageIs
            }
            Axios
                .post('http://localhost:3001/products', data, this.state.config)
                .then((response) => {
                    console.log(response.data)
                    if (response.status == 200) {
                        this.setState({redirect: true})
                        toast("New Product Added!!")
                    }

                })
                .catch((err) => {
                    console.log(err)
                    this.setState({checkValidImage: "Unsucessfull"})
                    return;
                })
        }
    }
    render()
    {
        const {cat} = this.state
        if (this.state.redirect) {
            return (<Redirect to="/dashboard/myproduct"/>)
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
            <div >
                <SideNavPage/>
                <Usernav/>
                <div className="product ">
                    <Container >
                        <h3 className="">Add Product</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Row >

                                <Col sm="6" md="4">
                                    <FormGroup>

                                        <div>
                                            <Input
                                                style={{
                                                display: 'none'
                                            }}
                                                type="file"
                                                inputProps={{
                                                accept: 'image/*'
                                            }}
                                                name="avatar"
                                                id="previewImage"
                                                onChange={this.handleFileSelected}/> {$imagePreview}
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
                                <Col sm="6" md="8">
                                    <FormGroup>
                                        {/*
                        <Input type="file" className="form-control" onChange={this.handleFileSelected}/> */}
                                        <Input
                                            type="textarea"
                                            name="productName"
                                            className="form-control"
                                            value={this.state.productName}
                                            onChange={this.handleChange}placeholder="Describe the Product"/> {this.state.productNameError
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
                                            type="number"
                                            name="quantity"
                                            className="form-control "
                                            value={this.state.quantity}
                                            onChange={this.handleChange}placeholder="Product Quantity"/> {this.state.quantityError
                                            ? (
                                                <Alert color="danger" size="sm" className="mt-2">
                                                    {this.state.quantityError}</Alert>
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
                                        <label htmlFor="category">Select Category</label>
                                        <select
                                            name="category"
                                            id="category"
                                            value={this.state.category}
                                            className="form-control"
                                            onChange={this.handleChange}>
                                            {cat.length
                                                ? (cat.map(cats => {
                                                    return (
                                                        <option value={cats._id}>{cats.name}</option>
                                                    )
                                                }))
                                                : null
}

                                        </select>
                                        {this.state.categoryError
                                            ? (
                                                <Alert color="danger" size="sm" className="mt-2">
                                                    {this.state.categoryError}</Alert>
                                            )
                                            : null
}
                                    </FormGroup>

                                    <FormGroup>

                                        <Input
                                            type="textarea"
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
                                    <Button color="primary" type="submit">Submit</Button>
                                </Col>

                            </Row>
                        </Form>
                    </Container>
                    <Footer/>
                </div>
            </div>
        )
    }
}
