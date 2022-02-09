import React from "react";
import {Layout,Affix} from "antd";
import FooterComponent from "../components/FooterComponent";
import '../styles/contact.css';
import HeaderHome from "../components/Home/HeaderHome";
import ContentContact from "../components/Home/ContentContact";


const { Header, Content, Footer } = Layout;

export default function ContactPage(){
    return(
        <div className="layout-heder">
            <Layout className="layout-heder">
                <Affix offsetTop={0}>
                    <Header className="header" style={{background: "rgba(0, 0, 0, .5)"}}>
                        <HeaderHome/>
                    </Header>
                </Affix>
                <Content style={{ padding: '0 50px',  }} className="content">
                    <Content style={{ padding: '0 24px', minHeight: 280}} >
                        <ContentContact/>
                    </Content>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor:"#292F36" }}>
                    <FooterComponent/>
                    <div style={{marginTop:'50px', color:"#ffffff"}}>
                        Aplication ©2021 Created by Joel Mendoza
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}