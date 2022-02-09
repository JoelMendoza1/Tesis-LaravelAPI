import React from "react";
import 'antd/dist/antd.css';
import '../styles/homepage.css';
import {Layout, Affix} from 'antd';
import FooterComponent from "../components/FooterComponent";
import HeaderHome from "../components/Home/HeaderHome";
import ContentHome from "../components/Home/ContentHome";
const { Header, Content, Footer } = Layout;
export default function HomePage(){
    return(
        <div className="layout-heder">
            <Layout className="layout-heder">
                <Affix offsetTop={0}>
                <Header className="header" style={{background: "rgba(0, 0, 0, .5)"}}>
                    <HeaderHome/>
                </Header>
                </Affix>
                <Content style={{ padding: '0 50px' }} className="content">
                    <ContentHome/>
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