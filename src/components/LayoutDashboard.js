import React from "react";
import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    FundOutlined,
    MenuFoldOutlined,
    UserOutlined,
    QuestionOutlined,
    ShopOutlined,
    SendOutlined, ReadOutlined
} from '@ant-design/icons';
import {BrowserRouter as Router, NavLink, Switch} from "react-router-dom";
import Routes from "../constants/routes";
import Logout from "../components/Logout";
import PrivateRoute from "../routers/PrivateRoute";

import PerfilesPage from "../pages/PerfilesPage";
import SolicitudesPage from "../pages/SolicitudesPage";
import OfertasPage from "../pages/OfertasPage";
import PostulacionPage from "../pages/PostulacionPage";
import OfertarPage from "../pages/OfertarPage";
import PostularPage from "../pages/PostularPage";
import EmpresaPage from "../pages/EmpresaPage";
import '../styles/dashboard.css'

const { Header, Sider, Content } = Layout;

export default class LayoutDashboard extends React.Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        return (
            <Layout style={{height:'100vh'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ padding: 0 , background:"#1E1E2F", height:'100%'}}>
                    <div className="logo"  style={{marginLeft:'30px'}}>
                        <NavLink to={ Routes.DASHBOARD } style={{color:'#ffffff'}} exact>
                            <ReadOutlined style={{fontSize: '100px !important', }}/>
                        </NavLink>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                            <Menu.Item key={Routes.DASHBOARD} icon={<UserOutlined />}>
                                <NavLink to={Routes.DASHBOARD}>
                                    Perfil
                                </NavLink>
                            </Menu.Item>


                            <Menu.Item key={Routes.SOLICITUDES} icon={<QuestionOutlined />}>
                                <NavLink to={Routes.SOLICITUDES}>
                                Solicitudes
                                </NavLink>
                            </Menu.Item>


                        <Menu.Item key={Routes.OFERTAS} icon={<FundOutlined />}>
                            <NavLink to={Routes.OFERTAS}>
                                Ofertas
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.POSTULACION} icon={<SendOutlined />}>
                            <NavLink to={Routes.POSTULACION}>
                                Postulaciones
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.OFERTAR} icon={<FundOutlined />}>
                            <NavLink to={Routes.OFERTAR}>
                                Ofertar
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.POSTULAR} icon={<SendOutlined />}>
                            <NavLink to={Routes.POSTULAR}>
                                Postular
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.EMPRESA} icon={<ShopOutlined />}>
                            <NavLink to={Routes.EMPRESA}>
                                Mi Empresa
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 , background:"#1E1E2F"}}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}


                        <Logout/>

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >

                            <Switch>

                                <PrivateRoute path={Routes.DASHBOARD} exact component={PerfilesPage}/>
                                <PrivateRoute path={Routes.SOLICITUDES} exact component={SolicitudesPage}/>
                                <PrivateRoute path={Routes.OFERTAS} exact component={OfertasPage}/>
                                <PrivateRoute path={Routes.POSTULACION} exact component={PostulacionPage}/>
                                <PrivateRoute path={Routes.OFERTAR} exact component={OfertarPage}/>
                                <PrivateRoute path={Routes.POSTULAR} exact component={PostularPage}/>
                                <PrivateRoute path={Routes.EMPRESA} exact component={EmpresaPage}/>
                            </Switch>

                    </Content>
                </Layout>
            </Layout>
        );
    }
}