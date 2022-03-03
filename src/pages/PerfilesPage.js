import React, {Component} from "react";
import {API} from "../services/API";
import axios from "axios";
import {Row, Col, Avatar, Card, PageHeader, Typography, List, Spin} from 'antd';
import { UserOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import ModalEditUser from "../components/Perfil/ModalEditUser";
import CargarImgen from "../components/Perfil/CargarImgen";
import ModalEditPassword from "../components/Perfil/ModalEditPassword";
import ModalEditarDocumento from "../components/Perfil/ModalEditarDocumento";
import EnviarSolicitud from "../components/Solicitudes/EnviarSolicitud";
const { Title } = Typography;

export default class PerfilesPage extends Component{
    constructor(props) {
        super(props);
        this.state ={
            usuarios: [],
            imagen:[],
            loading:false
        }
    }
    state ={
        usuarios: [],
        imagen:[],
        loading:false
    }
    componentDidMount(){
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response.data.image)
                const dato= response.data.image
                const nuevoDato= "http://localhost:8000/storage"+dato.substring(6);
                console.log(nuevoDato)
                //response.data.image
                this.setState({
                    usuarios: [response.data],
                    imagen:[nuevoDato],
                    loading:false
                })
            }).catch(e=>{
            console.log(e.response)
            /*this.setState({
            loading:false
            })*/
        })
    }
    render(){
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={<Title level={4}><UserOutlined /> Perfil</Title>}
                    subTitle="En este módulo permite editar los datos del perfil."
                    style={{background:"#ffffff"}}
                />
                <div>
                    {this.state.usuarios.map((value, index) => (
                        <Card key={index} style={{height:'80vh', paddingBottom:'0px'}}>
                            <InfiniteScroll>
                                <Card style={{height:'18vh',paddingTop:'20px', background:'#55556D', paddingBottom:'0px'}} >
                                    <Row justify="start" align="top">
                                        <Col span={8}>
                                            <Avatar size={{ xs: 72, sm: 96, md: 120, lg: 192, xl: 240, xxl: 300 }}
                                                    style={{
                                                        color: '#000000',
                                                        backgroundImage: `url('${this.state.imagen}')`,
                                                        backgroundSize: '100% 100%',
                                                        borderColor:"#ffffff",
                                                        borderSize:"30px"
                                                    }}
                                            >
                                                <Spin spinning={this.state.loading}/>

                                            </Avatar>
                                            <CargarImgen id={value.id} />
                                            <ModalEditUser/>
                                            <ModalEditPassword/>
                                            <ModalEditarDocumento request={value.request} description={value.descriptionRequest} id={value.id} typeUser={value.typeUser}/>
                                            <EnviarSolicitud request={value.request} id={value.id}/>
                                        </Col>
                                        <Col span={10}>
                                            <Title level={2} style={{color:"#ffffff"}}>{value.name} {value.lastname}</Title>
                                        </Col>
                                    </Row>
                                </Card>
                                <Row key={index} justify="end">
                                    <Col span={17}>
                                        <List>
                                            <List.Item>
                                                <Title level={5}><b>Email:</b> {value.email}</Title>
                                            </List.Item>
                                            <List.Item>
                                                <Title level={5}><b>Cédula:</b> {value.identificationCard}</Title>
                                            </List.Item>
                                            <List.Item>
                                                <Title level={5}><b>Teléfono:</b> {value.telephoneNumber}</Title>
                                            </List.Item>
                                            <List.Item>
                                                <Title level={5}><b>Dirección:</b> {value.address}</Title>
                                            </List.Item>
                                            <List.Item>
                                                <Title level={5}><b>Fecha de nacimiento:</b> {value.dateOfBirth}</Title>
                                            </List.Item>
                                            <List.Item>
                                                <Title level={5}><b>Institución:</b> {value.institution}</Title>
                                            </List.Item>
                                        </List>
                                    </Col>
                                </Row>
                            </InfiniteScroll>
                        </Card>
                    ))}
                </div>
            </div>

        )
    }}