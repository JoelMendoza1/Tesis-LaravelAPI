import React from "react";
import {Layout, Menu, Row, Col, Spin} from 'antd';
import {
    MenuUnfoldOutlined,
    FundOutlined,
    MenuFoldOutlined,
    UserOutlined,
    QuestionOutlined,
    ShopOutlined,
    NotificationOutlined, ReadOutlined, IdcardOutlined, BookOutlined,
} from '@ant-design/icons';
import { NavLink, Switch} from "react-router-dom";
import Routes from "../../constants/routes";
import PrivateRoute from "../../routers/PrivateRoute";
import PerfilesPage from "../../pages/PerfilesPage";
import SolicitudesPasantePage from "../../pages/SolicitudesPasantePage";
import OfertasPage from "../../pages/OfertasPage";
import PostulacionPage from "../../pages/PostulacionPage";
import OfertarPage from "../../pages/OfertarPage";
import PostularPage from "../../pages/PostularPage";
import EmpresaPage from "../../pages/EmpresaPage";
import '../../styles/dashboard.css';
import NavigationDashboard from "./NavigationDashboard";
import CurriculumPage from "../../pages/CurriculumPage";
import {API} from "../../services/API";
import axios from "axios";
import SolicitudesEmpresaPage from "../../pages/SolicitudesEmpresaPage";

const { Header, Sider, Content } = Layout;

export default class LayoutDashboard extends React.Component {

    state = {
        collapsed: false,
        id:0,
        administrador:'block',
        pasante:'block',
        empresa:'block',
        cargandoMenu:true,
        request:false,
        rol:''
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                if(response.data.request===null){
                    this.setState({
                        id:response.data.id,
                        request:true
                    })
                }
                if(response.data.request===1){
                    this.setState({
                        id:response.data.id,
                        request:false
                    })
                }
                if(response.data.request===0){
                    this.setState({
                        id:response.data.id,
                        request:true
                    })
                }
                console.log(response.data.request)
                this.getRol(response.data.id)
            }
        )
    }

    getRol(id){
        console.log('Rol', id)
        let url = API + 'getRol/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                this.oculatarOrVisualizar(response.data)
            }
        )
    }
    oculatarOrVisualizar(rol){
        if(rol==='administrador'){
            console.log('admin')
            this.setState({
                pasante:'none',
                empresa:'none',
                rol:'Admin'
            })
        }
        if(rol==='pasante'){
            console.log('pasante')
            this.setState({
                administrador:'none',
                empresa:'none',
                rol:'Pasante'
            })
        }
        if(rol==='empresa'){
            console.log('empresa')
            this.setState({
                administrador:'none',
                pasante:'none',
                rol:'Empresa'
            })
        }
        this.setState({
                cargandoMenu:false
        }
        )
    }
    render() {
        const MenuDashboard = () => {
            return(
                <div>
                    {(this.state.cargandoMenu)?<Spin size="small" />:
                    <div>
                        <Menu.SubMenu key="sub1" icon={<QuestionOutlined />} title="Solicitudes" style={{display:this.state.administrador}}>
                            <Menu.Item key={Routes.SOLICITUDESEMPRESA} icon={<ShopOutlined />} style={{display:this.state.administrador}} disabled={this.state.request}>
                                <NavLink to={Routes.SOLICITUDESEMPRESA} visible={this.state.administrador}>
                                    Empresa
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={Routes.SOLICITUDESPASANTE} icon={<BookOutlined/>} style={{display:this.state.administrador}} disabled={this.state.request}>
                                <NavLink to={Routes.SOLICITUDESPASANTE} visible={this.state.administrador}>
                                    Pasante
                                </NavLink>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key={Routes.OFERTAS} icon={<FundOutlined />} style={{display:this.state.pasante}} disabled={this.state.request}>
                            <NavLink to={Routes.OFERTAS}>
                                Ofertas
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.POSTULACION} icon={<NotificationOutlined />} style={{display:this.state.pasante}} disabled={this.state.request}>
                            <NavLink to={Routes.POSTULACION}>
                                Postulaciones
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.CURRICULUM} icon={<IdcardOutlined/>} style={{display:this.state.pasante}} >
                            <NavLink to={Routes.CURRICULUM}>
                                Curriculum
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.OFERTAR} icon={<FundOutlined />}style={{display:this.state.empresa}} disabled={this.state.request}>
                            <NavLink to={Routes.OFERTAR}>
                                Ofertar
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.POSTULAR} icon={<NotificationOutlined />}style={{display:this.state.empresa}} disabled={this.state.request}>
                            <NavLink to={Routes.POSTULAR}>
                                Postulaciones
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.EMPRESA} icon={<ShopOutlined />} style={{display:this.state.empresa}} >
                            <NavLink to={Routes.EMPRESA}>
                                Mi Empresa
                            </NavLink>
                        </Menu.Item>
                    </div>
                    }
                </div>
            )
        }
        return (
            <Layout style={{height:'100vh'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ padding: 0 , background:"#1E1E2F", height:'100%'}}>
                    <div className="logo"  style={{marginLeft:'30px'}}>
                        <NavLink to={ Routes.DASHBOARD } style={{color:'#ffffff'}} exact>
                            <ReadOutlined style={{fontSize: '100px !important', }}/>
                        </NavLink>
                    </div>
                    <h3 style={{color:'#ffffff',marginLeft:'20px'}}>  {this.state.rol}</h3>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{marginLeft:'10px'}} >
                        <div>
                            <Menu.Item key={Routes.DASHBOARD} icon={<UserOutlined />} >
                                <NavLink to={Routes.DASHBOARD}>
                                    Perfil
                                </NavLink>
                            </Menu.Item>
                            <MenuDashboard/>
                        </div>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 10 , background:"#1E1E2F", color:"#ffffff"}}>
                        <Row>
                            <Col span={12} push={12}>
                                <NavigationDashboard />
                            </Col>
                            <Col span={12} pull={12}>
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
                                <PrivateRoute path={Routes.SOLICITUDESPASANTE} exact component={SolicitudesPasantePage}/>
                                <PrivateRoute path={Routes.SOLICITUDESEMPRESA} exact component={SolicitudesEmpresaPage}/>
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