import React from "react";
import {Route, Redirect} from "react-router-dom";
import Routes from "../constants/routes";
import useAuth from "../auth/useAuth";

export default function PrivateRoute({component : Component, ...rest}){
    const auth = useAuth();
    return(
        <div>
            <Route {...rest}>{auth.user ? <Component/> : <Redirect to={Routes.LOGIN}/>}</Route>

        </div>
    )
}