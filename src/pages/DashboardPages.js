import React from "react";
import {Button, Card, Layout, Row, Col, Typography,Avatar} from "antd";
import useAuth from "../auth/useAuth";
import {NavLink, Redirect} from "react-router-dom";
import Routes from "../constants/routes";
import {ReadOutlined, LogoutOutlined,UserOutlined} from "@ant-design/icons";
import FooterComponent from "../components/FooterComponent";
import "../styles/dashboard.css";
const { Title } = Typography;

const { Header, Content, Footer } = Layout;
export default function DashboardPages(){
    const auth= useAuth();

        const users=localStorage.getItem('username');


    return(
        <div>
            <div className="layout-dashboard">
                <Layout className="dashboard-layout">
                    <Header className="dashboard" style={{background:'#1E1E2F'}}>
                        <Row>
                            <Col span={8}>
                                <div className="logo" >
                                    <NavLink to={ Routes.DASHBOARD } style={{color:'#ffffff'}} exact>
                                        <ReadOutlined style={{fontSize: '100px !important', }}/>
                                    </NavLink>
                                </div>
                            </Col>
                            <Col span={8}>


                            </Col>
                            <Col span={8} >
                                <Button onClick={auth.logout} style={{backgroundColor:'#ffffff', color:'#1E1E2F', marginLeft:'100px', height:'40px'}}>
                                    <LogoutOutlined /> Cerrar Sesión
                                </Button>
                            </Col>
                        </Row>

                        </Header>
                    <Content style={{ padding: '0 50px' }} className="content-dashboard">

                        <Content style={{ padding: '0 24px', minHeight: 280 }} >
                            <Card className="card-dashboard" type="inner">
                                <h1>DashboardPages</h1>
                                <h1>Usuario no habilitado</h1>
                                <h1>Espere estamos procesando su solicitud para añadirse a esta plataforma</h1>
                            </Card>
                        </Content>

                    </Content>

                    <Footer style={{ textAlign: 'center', backgroundColor:"#1E1E2F"}}>
                        <FooterComponent/>
                        <div style={{marginTop:'50px', color:"#ffffff"}}>
                            Aplication ©2021 Created by Joel Mendoza
                        </div>
                    </Footer>
                </Layout>

            </div>
        </div>
    )
}