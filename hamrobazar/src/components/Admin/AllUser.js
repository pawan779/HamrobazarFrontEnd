import React, {Component} from 'react'
import Axios from 'axios'
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Table,
    Button,
    Input
} from 'reactstrap'
import {Link, Redirect} from 'react-router-dom'
import SideNavPage from './SideNavPage'
import Adminnav from './Adminnav'
import { toast } from 'react-toastify'

export default class AllUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            user: {},
            path: '',
            redirect:false
        }
    }

 

    componentDidMount() {
        Axios
            .get("http://192.168.1.21:3001/users/all",this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({user: response.data, path: 'http://192.168.1.21:3001/uploads/',userID:response.data.user})
            })

    }


    render() {

    

        const {user} = this.state
        return (
            <div>
                <SideNavPage/>
                <Adminnav/>
            <Container>
    <Table className="table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Image</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                    {user.length
                        ? (user.map(users =><tbody key = {
                            users._id
                           
                        } > 
                    
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{users.fullName}</td>
                                    <td><img src={this.state.path + users.image}width="30%"/></td>
                                    <td>{users.mobilePhone}</td>
                                     <td> {users.address3}
                                    </td>
                    <td>{users.email}</td>

                           <td>        
                        <Link to={`/admin/dashboard/users/${users._id}`}>
                            <Button renderAs="button" color="warning">
                                View Details
                            </Button>
                            </Link>
                       </td>
                                    </tr>
   

                              
                         

                        </tbody>
                        
                        )
                        
                        )
                        
                
                        :null

                          
                }
                
            </Table>
            </Container>
            </div>
        )
    }
}
