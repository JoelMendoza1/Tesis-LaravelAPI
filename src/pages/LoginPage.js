import React from "react";
import useAuth from "../auth/useAuth";
import {NavLink, useHistory} from "react-router-dom";
import Routes from "../constants/routes";
import {Card, Layout, message} from 'antd';
import {API} from "../services/API";
import "../styles/login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import {MailOutlined, KeyOutlined, ReadOutlined} from '@ant-design/icons';
import axios from "axios";
import FooterComponent from "../components/FooterComponent";
import ContentRegistrar from "../components/Registrar/ContentRegistrar";
import LoginHeader from "../components/Login/LoginHeader";
import ContentLogin from "../components/Login/ContentLogin";
const { Footer, Header, Content } = Layout;
export default function LoginPage(){
    return(
        <div>
            <Layout>
                <Header style={{backgroundColor:"#292F36"}}>
                    <LoginHeader/>
                </Header>
                <Content
                    style={{
                        backgroundColor: "#292f36",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%23c0c0c0' fill-opacity='0.4'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                    className="content"
                >
                    <ContentLogin/>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor:"#292F36"}}>
                    <FooterComponent/>
                    <div style={{marginTop:'50px', color:"#ffffff"}}>
                        Aplication ©2021 Created by Joel Mendoza
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}