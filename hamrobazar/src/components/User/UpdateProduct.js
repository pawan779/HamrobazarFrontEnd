import React, {Component} from 'react'
import Axios from 'axios';
import {
    Container,
    Row,
    Col,
    CardImg,
    Form,
    Button,
    Input,
    FormGroup,
    Alert
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class UpdateProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            path: '',
            product: '',
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
            ID:''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillMount() {
      
        var proID = this.props.match.params.id;
        Axios
            .get("http://localhost:3001/products/my/" +proID, this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    product: response.data,
                    path: 'http://localhost:3001/uploads/',
                    productName: response.data.productName,
                    productPrice: response.data.productPrice,
                    productCondition: response.data.productCondition,
                    image: response.data.image,
                    productDescription: response.data.productDescription,
                    category: response.data.category,
                    ID:response.data._id
                })
            })

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

    validate = () => {
        let productNameError = "";
        let productPriceError = "";
        let productDescriptionError = "";
        let productConditionError = "";
        let categoryError = "";

        if (!this.state.productName) {
            productNameError = "Full name cannot be empty";
        }
        if (this.state.productPrice.includes('-', '+', '.', '?', '/', '<', '>', '{', '}')) {
            productPriceError = "Invalid price format"
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
       
       

        if (productNameError || productPriceError || productDescriptionError || productConditionError || categoryError) {
            this.setState({productNameError, productPriceError, productDescriptionError, productConditionError, categoryError})
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

            const fd = new FormData();
            fd.append('imageFile', this.state.selectedFile,this.state.selectedFile.name);
            Axios
                .post('http://localhost:3001/upload', fd)
                .then(res => {
                    console.log(res);
                    var data = {
                        productName: this.state.productName,
                        productPrice: this.state.productPrice,
                        productDescription: this.state.productDescription,
                        productCondition: this.state.productCondition,
                        category: this.state.category,
                        image: 'imageFile-'+this.state.selectedFile.name
                    }
                    Axios
                        .put('http://localhost:3001/products/'+this.state.ID, data, this.state.config)
                        .then((response) => {
                            console.log(response.data)
                            if (response.status == 200) {
                                this.setState({redirect: true})
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                            this.setState({checkValidImage: "Unsucessfull"})
                        })

                })
                .catch((err) => {
                    console.log(err)
                    this.setState({checkValidImage: "Image is not valid"})
                })

        }

    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/dashboard"/>)
        }
        const {product} = this.state

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
                <div className="image-container text-center"><img src={this.state.path + product.image} alt="icon" width="200" height="200"/>
                </div>
            );
        }
    
        return (
            <Container>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Col md="6">

                            <FormGroup>

                                <div>
                                    <input
                                        type="file"
                                        inputProps={{
                                        accept: 'image/*'
                                    }}
                                        name="avatar"
                                        onChange={this.handleFileSelected}
                                        ref={fileInput => this.fileInput = fileInput}/> {$imagePreview}
                                </div>
                                {this.state.checkValidImage
                                    ? (
                                        <Alert>{this.state.checkValidImage}</Alert>
                                    )
                                    : null
}
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <h1 className="m-2 text-center">Add product</h1>

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
                        
                    </Col>
                    </Form>
                </Row>
            </Container>
        )
    }
}
