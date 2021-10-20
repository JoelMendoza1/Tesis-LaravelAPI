import React from "react";
import { Card, Layout} from "antd";
import {NavLink} from "react-router-dom";
import Routes from "../constants/routes";
import {BookFilled} from "@ant-design/icons";
import Navigation from "../components/Home/Navigation";
import FooterComponent from "../components/FooterComponent";
import About from "../components/Home/About";
import '../styles/about.css';
import 'antd/dist/antd.css';


const { Header, Content, Footer } = Layout;


export default function AboutPages(){
    return(
        <div className="layout-heder">
            <Layout className='layout-heder'>
                <Header className="header" style={{background: "rgba(0, 0, 0, .5)"}}>
                    <div className="logo" >
                        <NavLink to={ Routes.HOME } style={{color:'#292F36'}} exact>
                            <BookFilled style={{fontSize: '100px !important', }}/>
                        </NavLink>


                    </div>

                    <Navigation className="header"/>
                </Header>
                <Content style={{ padding: '0 50px', height: '800px !important'}} >

                    <Content style={{ padding: '0 24px', marginBottom:'100px' }} >
                        <Card className="card-about" type="inner" >
                            <About/>
                        </Card>
                    </Content>

                </Content>

                <Footer style={{ textAlign: 'center' , backgroundColor:"#292F36"}}>
                    <FooterComponent/>
                    <div style={{marginTop:'50px', color:"#ffffff"}}>
                        Aplication ©2021 Created by Joel Mendoza
                    </div>
                </Footer>
            </Layout>

        </div>
    )
}