import {Avatar, Button, Col, Row, Divider, Modal, Card, Badge, Descriptions} from "antd";
import {BookOutlined, SearchOutlined, FundOutlined,EnvironmentOutlined,TeamOutlined,ClockCircleOutlined } from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import {URLH} from "../../services/URLH";

export default class VerOferta extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            ofertas:[],
            imagen:[],
            modal:false,
            id: props.id,
            ok: false
        })
    }
    componentDidMount(id) {
        this.getOferta(id)
    }
    getOferta (id) {
        let url = API + 'ofertas/'+id;
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
                    ofertas: [response.data],
                })
                console.log(this.state.ofertas)
            }
        )
    }
    apagarModal=()=>{
        this.setState({
            modal: false,
            usuarios: [],
            imagen:[],
        })
    }
    encenderModal=()=>{
        this.setState({
            modal: true
        })
        this.componentDidMount(this.props.id)
    }
    render(){

        return(
            <div>
                <Button
                    type="primary"
                    style={{background:"#292F36", borderColor: "transparent"}}
                    shape="circle"
                    icon={<SearchOutlined />}
                    title="Ver Oferta"
                    onClick={this.encenderModal}
                />
                <Modal
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Regresar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                    width={900}
                >
                    <div>
                        <h1 style={{justifyContent:'center'}}><FundOutlined /> Oferta</h1>
                    </div>
                    <Divider />
                    <Card>
                        {this.state.ofertas.map((value, index) =>
                        <div key={index}>
                            <Card key={index}
                                  style={{
                                      marginTop:'30px',
                                      paddingTop:'30px',
                                      width:'800px',
                                      alignItems:'center',
                                      marginRight:'auto',
                                      marginLeft:'auto',
                                      display:'block',
                                      background:"#1E1E2F"
                                  }}
                                  >
                                <Row>
                                    <Col span={6}>
                                        <h3 style={{color:'#ffffff'}}>
                                            <Avatar
                                                size={35}
                                                style={{
                                                    color: '#000000',
                                                    backgroundImage: `url('${URLH}storage${value.empresa_id.imagen.substring(6)}')`,
                                                    backgroundSize: '100% 100%',
                                                    marginRight:'20px',
                                                }}
                                            />
                                            {value.empresa_id.nombreEmpresa}
                                        </h3>
                                    </Col>
                                    <Col span={10}>
                                        <h2 style={{color:'#ffffff'}}>
                                            {value.oferta}
                                        </h2>
                                    </Col>
                                    <Col span={4}>
                                        <h4 style={{paddingTop:"5px", color:'#ffffff'}}>°- {value.updated_at.substring(0,value.updated_at.length -17 )}</h4>
                                    </Col>
                                    <Col span={4}>
                                        {
                                            (value.visible )?
                                                (value.numberoPostulantes<=0)?<Badge status="processing" text="No disponible" style={{color:"#ffffff"}}/>
                                                    :<Badge status="success" text="Disponible" style={{color:"#ffffff"}}/>
                                                :<Badge status="error" text="Terminada" style={{color:"#ffffff"}}/>
                                        }


                                    </Col>

                                </Row>
                                <Descriptions
                                    title="Descripción"
                                    style={{
                                        marginTop:'20px',
                                        marginBottom:'20px',
                                        width:'600px',
                                        marginRight:'auto',
                                        marginLeft:'auto',
                                        display:'block',
                                        background:"#ffffff",
                                        padding:'20px'
                                    }}
                                >
                                    <Descriptions.Item>{value.descripcionOferta}</Descriptions.Item>
                                </Descriptions>
                                <h3 style={{color:'#ffffff'}}><ClockCircleOutlined /> Horario: {value.horario}</h3>
                                <h3 style={{color:'#ffffff'}}><TeamOutlined /> Pasantes disponibles: {value.numberoPostulantes}</h3>
                                <h3 style={{color:'#ffffff'}}><EnvironmentOutlined /> Dirección: {value.direcionOferta}</h3>
                                <h3 style={{color:'#ffffff'}}><BookOutlined /> Carrera: {value.carreraOferta}</h3>
                            </Card>
                        </div>
                        )}
                    </Card>
                </Modal >
            </div>
        )
    }
}