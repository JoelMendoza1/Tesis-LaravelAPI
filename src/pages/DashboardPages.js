import React from "react";
import {Card, Layout, Row, Col} from "antd";
import {NavLink} from "react-router-dom";
import Routes from "../constants/routes";
import {ReadOutlined} from "@ant-design/icons";
import FooterComponent from "../components/FooterComponent";
import "../styles/dashboard.css";
import NavigationDashboard from "../components/Dashboard/NavigationDashboard";
import PerfilesPage from "./PerfilesPage";

const { Header, Content, Footer } = Layout;
export default function DashboardPages(){
    return(
        <div>
            <div className="layout-dashboard">
                <Layout className="dashboard-layout">
                    <Header className="dashboard" style={{background:'#1E1E2F'}}>
                        <Row justify="end">
                            <Col  flex="100px">
                                <div className="logo" style={{font:'left'}} >
                                    <NavLink to={ Routes.CONFIRMATION } style={{color:'#ffffff'}} exact>
                                        <ReadOutlined style={{fontSize: '100px !important', }}/>
                                    </NavLink>
                                </div>
                            </Col>
                            <Col flex="auto">
                                <NavigationDashboard/>
                            </Col>
                        </Row>

                        </Header>
                    <Content style={{ padding: '0 50px' }} className="content-dashboard">

                        <Content style={{ padding: '0 24px', minHeight: 280 }} >
                            <Card className="card-dashboard" type="inner">
                                <h1>DashboardPages</h1>
                                <h1>Usuario no habilitado</h1>
                                <h1>Espere estamos procesando su solicitud para añadirse a esta plataforma</h1>
                                <PerfilesPage/>
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