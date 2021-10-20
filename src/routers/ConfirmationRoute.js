import React from "react";
import {Route, Redirect} from "react-router-dom";
import Routes from "../constants/routes";
import useAuth from "../auth/useAuth";

export default function ConfirmationRoute({component : Component, ...rest}){
    const auth = useAuth();
    return(
        <div>
            <Route {...rest}>{auth.user ? <Component/> : <Redirect to={Routes.CONFIRMATION}/>}</Route>

        </div>
    )
}