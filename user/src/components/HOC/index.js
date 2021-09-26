import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = window.localStorage.getItem("token");
    return <Route {...rest} component={() => {
        if (token)
            return <Component />
        else
            return <Redirect to={'/signin'}/>
    }}/>
}

export default PrivateRoute