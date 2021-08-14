import React from "react";
import 'antd/dist/antd.css';
import '../styles/homepage.css';
import {ReadOutlined } from '@ant-design/icons';
import {Button, Card, Layout, Typography} from 'antd';
import Navigation from "../components/Navigation";
import Routes from "../constants/routes";
import stylesNavigation from "../styles/navigation.css";
import {NavLink} from "react-router-dom";
import FooterComponent from "../components/FooterComponent";



const { Header, Content, Footer } = Layout;
const { Title } = Typography;
export default function HomePage(){
    return(
        <div className="layout-heder">
            <Layout className="layout-heder">
                <Header className="header" style={{background: "rgba(0, 0, 0, .5)"}}>
                    <div className="logo" >
                        <NavLink to={ Routes.HOME } style={{color:'#292F36'}} exact>
                            <ReadOutlined style={{fontSize: '100px !important', color:'#ffffff' }}/>
                        </NavLink>


                    </div>

                    <Navigation className="header"/>
                </Header>
                <Content style={{ padding: '0 50px' }} className="content">

                        <Content style={{ padding: '0 24px', minHeight: 280, height: '560px'}} >
                            <Card className="card-home" type="inner">
                                <Title level={2} style={{color: '#ffffff'}}>Obtener experiencia laboral no está tan lejos, la oportunidad está a tan solo un click de distancia</Title>
                                <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                    <NavLink to={ Routes.REGISTER } className={stylesNavigation.active} exact>Registrar</NavLink>
                                </Button>
                            </Card>
                        </Content>

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