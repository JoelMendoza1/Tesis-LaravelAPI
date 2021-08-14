import React from "react";
import Routes from "../constants/routes";
import FooterComponent from "../components/FooterComponent";
import {Layout} from "antd";

const { Footer } = Layout;

export default function RegisterPage(){

    return(
        <div>
            <h1>Register</h1>
            <a href={Routes.HOME}>Home</a>
            <Footer style={{ textAlign: 'center', backgroundColor:"#292F36"}}>
                <FooterComponent/>
                <div style={{marginTop:'50px', color:"#ffffff"}}>
                    Aplication ©2021 Created by Joel Mendoza
                </div>
            </Footer>
        </div>
    )
}