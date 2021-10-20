import React from "react";
import {Layout, Menu, Row, Col} from 'antd';
import {
    MenuUnfoldOutlined,
    FundOutlined,
    MenuFoldOutlined,
    UserOutlined,
    QuestionOutlined,
    ShopOutlined,
    NotificationOutlined, ReadOutlined, IdcardFilled,
} from '@ant-design/icons';
import { NavLink, Switch} from "react-router-dom";
import Routes from "../../constants/routes";
import PrivateRoute from "../../routers/PrivateRoute";
import PerfilesPage from "../../pages/PerfilesPage";
import SolicitudesPage from "../../pages/SolicitudesPage";
import OfertasPage from "../../pages/OfertasPage";
import PostulacionPage from "../../pages/PostulacionPage";
import OfertarPage from "../../pages/OfertarPage";
import PostularPage from "../../pages/PostularPage";
import EmpresaPage from "../../pages/EmpresaPage";
import '../../styles/dashboard.css';
import NavigationDashboard from "./NavigationDashboard";
import Logout from "../Dashboard/Logout";
import CurriculumPage from "../../pages/CurriculumPage";

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >

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
                        <Menu.Item key={Routes.POSTULACION} icon={<NotificationOutlined />}>
                            <NavLink to={Routes.POSTULACION}>
                                Postulaciones
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.CURRICULUM} icon={<IdcardFilled/>}>
                            <NavLink to={Routes.CURRICULUM}>
                                Curriculum
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.OFERTAR} icon={<FundOutlined />}>
                            <NavLink to={Routes.OFERTAR}>
                                Ofertar
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.POSTULAR} icon={<NotificationOutlined />}>
                            <NavLink to={Routes.POSTULAR}>
                                Postulaciones
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.EMPRESA} icon={<ShopOutlined />}>
                            <NavLink to={Routes.EMPRESA}>
                                Mi Empresa
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <Logout/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 10 , background:"#1E1E2F", color:"#ffffff"}}>
                        <Row>
                            <Col span={18} push={6}>
                                <NavigationDashboard />
                            </Col>
                            <Col span={6} pull={18}>

                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,

                                })}
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '0px',
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
                                <PrivateRoute path={Routes.CURRICULUM} exact component={CurriculumPage}/>
                            </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}