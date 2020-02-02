import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute =({component:Component, ...rest})=>(
    <Route 
    {...rest}
    render={props=>
    localStorage.getItem("token" && "admin")?(
<Component {...props} />
    ):(
        <Redirect to={{
            pathname:'/',
            state:{from:props.location}
        }}
        />
    )}
    />


);


export default AdminRoute;