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
    Input,Alert
} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import SideNavPage from './SideNavPage'
import Adminnav from './Adminnav'
import { toast } from 'react-toastify'

export default class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            category: {},
            addCategory:false,
            editCategory:'',
            categoryName:'',
            redirect:false,
            id:'',
            categoryError:''
        }
    }

 

    componentDidMount() {
        Axios
            .get("http://192.168.1.21:3001/category",this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({category: response.data})
            })

    }

editCategory=event=>{
    Axios.get("http://192.168.1.21:3001/category/"+event.target.value,this.state.config)
    .then((response)=>{
        console.log(response.data)
        {
            this.setState({editCategory:response.data.name,id:response.data._id})
        }
    })
}




updateCategory=event=>{    
        var data = {
            name: this.state.editCategory
        }
    Axios.put("http://192.168.1.21:3001/category/"+event.target.value,data,this.state.config)
    .then((response)=>
    {
        console.log(response.data)
        this.setState({redirect:true})
        toast("Category Updated!!")
    })
    .catch((err)=>
    {
        console.log(err)
        toast("failed!!")
    })
}

validate = () => {
   
}



deleteCategory=event=>{
    Axios.delete("http://192.168.1.21:3001/category/"+event.target.value,this.state.config)
    .then((response)=>{
        console.log(response.data)
        this.setState({redirect:true})
        toast("Category Deleted!!")
    })
    .catch((err)=>
    {
        console.log(err)
        toast("failed!!")
    })
}

saveCategory=event=>{
    let categoryError = "";

    if (!this.state.categoryName) {
        this.setState({categoryError :"Category name cannot be empty"})
    }
        var data = {
            name: this.state.categoryName
        }
    Axios.post("http://192.168.1.21:3001/category",data,this.state.config)
    .then((response)=>{
        console.log(response)
        this.setState({redirect:true})
        toast("New Category Added!!")
    })
    .catch((err)=>
    {
        console.log(err)
        toast("failed!!!")
    })
    
}
handleChange=event=>{
    this.setState({
        [event.target.name]:event.target.value
     
    })
}

addCategory=event=>{
    this.setState({
        addCategory:true
    })
}

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/admin/dashboard/category"/>)
        }
    

        const {category} = this.state
        return (
            <div>
                <SideNavPage/>
                <Adminnav/>
            <Container>
    <Table className="table-responsive">
                            <thead>

                            {
                                this.state.editCategory?
                                (
                                    <tr>
                                        <td></td>
                                        <td><Input className="form-control" type="text" name="category" value={this.state.editCategory} onChange={this.handleChange} placeholder="Category name"/></td>

                                        <td><Button className="btn-success btn-sm" value={this.state.id} onClick={this.updateCategory}>Update</Button></td>
                                    </tr>

                                 )
                                :null
                            } 
                        
                                {
                                    this.state.addCategory?
                                    (
                                        <tr>
                                        <td></td>
                                        <td><Input className="form-control" type="text" name="categoryName" value={this.state.categoryName} onChange={this.handleChange} placeholder="Category name"/>
                                        {this.state.categoryError
                                        ? (
                                            <Alert color="danger" size="sm" className="mt-2">
                                                {this.state.categoryError}</Alert>
                                        )
                                        : null}
                                        </td>

                                        <td><Button className="btn-success btn-sm" value={this.state.id} onClick={this.saveCategory}>Save</Button></td>
                                    </tr>
                                    )
                                    :( <tr>
                                        <td><Button className="btn-primary btn-sm" onClick={this.addCategory}>Add Category</Button></td>
                                        </tr>)

                                }
                           


                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                    {category.length
                        ? (category.map(cat =><tbody key = {
                            cat._id
                           
                        } > 
                    
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{cat.name}</td>
                                <td><Button className="btn-sm btn-warning" value={cat._id} onClick={this.editCategory}>Edit</Button></td>
                                <td><Button className="btn-sm btn-danger" value={cat._id} onClick={this.deleteCategory}>Delete</Button></td>
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

