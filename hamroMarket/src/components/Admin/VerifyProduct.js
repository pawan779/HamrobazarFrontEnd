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
import SideNavPage from './SideNavPage'
import Adminnav from './Adminnav'
import {Link, Redirect} from 'react-router-dom'
import {toast} from 'react-toastify'
import Footer from '../home/Footer'

export default class VerifyProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: '',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            userID: '',
            redirect: false

        }
    }

    componentDidMount() {

        var proID = this.props.match.params.id;
        Axios
            .get("http://localhost:3001/admin/product/" + proID, this.state.config)
            .then((response) => {

                console.log(response.data)

                this.setState({products: response.data, path: 'http://localhost:3001/uploads/', userID: response.data.user})
            })
    }
    verifyProduct = event => {

        var data = {
            isVerified: true
        }
        Axios
            .put("http://localhost:3001/admin/product/" + event.target.value, data, this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({redirect: true})
                toast("Product Verified!!")

            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/dashboard/product"/>)
        }
        const {products} = this.state

        return (
            <div>
                <SideNavPage/>
                <Adminnav/>

                <Container>
                    <Row>
                        <CardHeader className="col-md-6 mx-auto">
                            <div className="imageResponsive mx-auto">
                                <CardImg src={this.state.path + products.image} className="user-image"/>
                            </div>

                            <CardBody>
                                <CardHeader>Title: {products.productName}</CardHeader>
                                <CardHeader>Price: {products.productPrice}</CardHeader>
                                <CardHeader>Condition: {products.productCondition}</CardHeader>
                                <CardHeader>Description: {products.productDescription}</CardHeader>
                                <CardBody className="text-center">
                                    <CardLink>

                                        {products.isVerified === true
                                            ? (
                                                <Button color="success">Verified</Button>
                                            )
                                            : (
                                                <Button color="warning" value={products._id} onClick={this.verifyProduct}>Verfy this</Button>
                                            )
}

                                    </CardLink>

                                    <CardLink>

                                        <Link to={`/admin/dashboard/users/${products.user}`}>
                                            <Button renderAs="button" color="secondary">
                                                View User Details
                                            </Button>
                                        </Link>

                                    </CardLink>
                                </CardBody>
                            </CardBody>
                        </CardHeader>

                    </Row>

                </Container>
                <Footer/>
            </div>
        )
    }
}
