import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AboutPages from "../pages/AboutPages";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NoFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Routes from "../constants/routes";
import DashboardPages from "../pages/DashboardPages";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LayoutDashboard from "../components/Dashboard/LayoutDashboard"
import ConfirmationRoute from "./ConfirmationRoute";

function DashboardPlataform(){
    return(
        <div>
            <LayoutDashboard/>
        </div>
    )
}
export default  function AppRouter(){
    return(
        <div>
            <Router>

                <Switch>
                    <PublicRoute path={Routes.HOME} exact component={HomePage}/>
                    <PublicRoute path={Routes.ABOUT} component={AboutPages}/>
                    <PublicRoute path={Routes.LOGIN} exact component={LoginPage}/>
                    <PublicRoute path={Routes.REGISTER} exact component={RegisterPage}/>
                    <PublicRoute path={Routes.CONTACT}  component={ContactPage}/>
                    <PrivateRoute path={Routes.DASHBOARD} component={DashboardPlataform}/>
                    <ConfirmationRoute path={Routes.CONFIRMATION} component={DashboardPages}/>
                    <Route path="*" exact component={NotFoundPage}/>
                </Switch>
            </Router>
        </div>
    )
}