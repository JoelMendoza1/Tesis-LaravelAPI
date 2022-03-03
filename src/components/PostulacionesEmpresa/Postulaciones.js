import React from "react";
import {Avatar, Badge, Card, Col, Descriptions, message, Row, Tabs} from 'antd';
import {API} from "../../services/API";
import axios from "axios";
import {BookOutlined, ClockCircleOutlined, EnvironmentOutlined, TeamOutlined} from "@ant-design/icons";
import TablaPostulaciones from "./TablaPostulaciones";
import Search from "antd/es/input/Search";

const { TabPane } = Tabs;

export default class Postulaciones extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            ofertas: [],
            total:0,
        })
    }
    componentDidMount(){
        this.getUser()
    }
    async consultaAPI(id){
        let url = API + 'empresas/'+id+'/ofertas';
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    ofertas: response.data,
                    total: response.data.length
                })
                console.log(this.state.ofertas)
            }
        )
    }
    getUser=()=>{
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.get(url, config).then(
            response=>{
                this.getEmpresa(response.data.id)
            }
        )
    }
    getEmpresa=async(id)=>{
        console.log(id)
        let url = API + 'users/'+id+'/empresas';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response.data.id)
                this.consultaAPI(response.data.id)
            }
        ).catch(
            e=>{
                console.log(this.state.empresa)
                console.log(e.message)
                message.error("Empresa no encontrada!")
            }
        )
    }
    render() {
        return(
            <div style={{margin:'0px'}}>
                <Search placeholder="Busca tú oferta o carrera"
                        style={{
                            width: 400,
                            marginTop:'20px',
                            marginRight:'auto',
                            marginLeft:'auto',
                            display:'block',
                            paddingBottom:'10px'
                        }}
                        onChange={event=>{
                            console.log(event.target.value)
                            this.setState({
                                buscarTerm:event.target.value
                            })
                        }}
                />
                <div>
                    {this.state.ofertas.filter(((value) => {
                        if(!this.state.buscarTerm){
                        return value
                    }else if (value.oferta.toLowerCase().includes(this.state.buscarTerm.toLowerCase())){
                        return value
                    }
                    })).map((value, index) =>
                        <Row>
                            <Col span={12}>
                                <Card key={index}
                                      style={{
                                          marginTop:'30px',
                                          paddingTop:'30px',
                                          width:'500px',
                                          alignItems:'center',
                                          marginRight:'auto',
                                          marginLeft:'auto',
                                          display:'block',
                                          background:"#1E1E2F"
                                      }}
                                >
                                    <Row>
                                        <Col span={6}>
                                            <h4 style={{color:'#ffffff'}}>
                                                <Avatar
                                                    size={25}
                                                    style={{
                                                        color: '#000000',
                                                        backgroundImage: `url('http://localhost:8000/storage${value.empresa_id.imagen.substring(6)}')`,
                                                        backgroundSize: '100% 100%',
                                                        marginRight:'20px',
                                                    }}
                                                />
                                                {value.empresa_id.nombreEmpresa}
                                            </h4>
                                        </Col>
                                        <Col span={10}>
                                            <h5 style={{color:'#ffffff'}}>
                                                {value.oferta}
                                            </h5>
                                        </Col>
                                        <Col span={4}>
                                            <h6 style={{paddingTop:"5px", color:'#ffffff'}}>°- {value.updated_at.substring(0,value.updated_at.length -17 )}</h6>
                                        </Col>
                                        <Col span={4}>
                                            {
                                                (value.visible )?
                                                    (value.numberoPostulantes<=0)?<h6 style={{color:"#ffffff"}}><Badge status="processing"/>No disponible</h6>
                                                        :<h6 style={{color:"#ffffff"}}><Badge status="success" />Disponible</h6>
                                                    :<h6 style={{color:"#ffffff"}}><Badge status="error" />Terminada</h6>
                                            }
                                        </Col>
                                    </Row>
                                    <Descriptions
                                        title="Descripción"
                                        style={{
                                            marginTop:'20px',
                                            marginBottom:'20px',
                                            width:'450px',
                                            marginRight:'auto',
                                            marginLeft:'auto',
                                            display:'block',
                                            background:"#ffffff",
                                            padding:'20px'
                                        }}
                                    >
                                        <Descriptions.Item>{value.descripcionOferta}</Descriptions.Item>
                                    </Descriptions>
                                    <h1 style={{color:'#ffffff'}}><ClockCircleOutlined /> Horario: {value.horario}</h1>
                                    <h1 style={{color:'#ffffff'}}><TeamOutlined /> Pasantes disponibles: {value.numberoPostulantes}</h1>
                                    <h1 style={{color:'#ffffff'}}><EnvironmentOutlined /> Dirección: {value.direcionOferta}</h1>
                                    <h1 style={{color:'#ffffff'}}><BookOutlined /> Carrera: {value.carreraOferta}</h1>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                                    <TabPane tab="Todos" key="1">
                                        <TablaPostulaciones idoferta={value.id} ruta='/postulacions'/>
                                    </TabPane>
                                    <TabPane tab="Pendiente" key="2">
                                        <TablaPostulaciones idoferta={value.id} ruta='/postulacionsPendiente'/>
                                    </TabPane>
                                    <TabPane tab="Aceptados" key="3">
                                        <TablaPostulaciones idoferta={value.id} ruta='/postulacionsAprobado'/>
                                    </TabPane>
                                    <TabPane tab="Rechazados" key="4">
                                        <TablaPostulaciones idoferta={value.id} ruta='/postulacionsRechazado'/>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        )
    }
}
