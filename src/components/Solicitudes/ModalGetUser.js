import {Avatar, Button, Card, Col, Divider, Modal, Row, Spin} from "antd";
import {
    BankOutlined,
    BarsOutlined, BookOutlined,
    IdcardOutlined,
    ProjectOutlined,
    ToolOutlined, TranslationOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import CardGetEmpresa from "./CardGetEmpresa";
import InfiniteScroll from "react-infinite-scroller";
import GetTrayectoria from "./GetTrayectoria";
import GetProyectos from "./GetProyectos";
import GetIdiomas from "./GetIdiomas";
import GetHabilidades from "./GetHabilidades";
import GetInstruccion from "./GetInstruccion";
import GetCapacitaciones from "./GetCapacitaciones";
import {URLH} from "../../services/URLH";

export default class ModalGetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            usuarios: [],
            imagen: [],
            modal: false,
            id: props.id,
            ok: false,
            loading: true
        })
    }

    componentDidMount(id) {
        this.getUser(id)
    }

    getUser = async (id) => {
        let url = API + 'users/' + id;
        const token = localStorage.getItem('token')
        const t = token.replace(/['"]+/g, '')
        const config = {
            headers: {Authorization: `Bearer ${t}`}
        };
        axios.get(url, config).then(
            response => {
                if (response.data.image == null) {
                    const nuevoDato = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    this.setState({
                        usuarios: [response.data],
                        imagen: [nuevoDato],
                        loading: false
                    })
                } else {
                    const dato = response.data.image
                    const nuevoDato = URLH+"storage" + dato.substring(6);
                    this.setState({
                        usuarios: [response.data],
                        imagen: [nuevoDato],
                        loading: false
                    })
                }
            }
        )
    }
    apagarModal = () => {
        this.setState({
            modal: false,
            usuarios: [],
            imagen: [],
        })
    }
    encenderModal = () => {
        this.setState({
            modal: true
        })
        this.componentDidMount(this.props.id)
    }

    render() {

        return (
            <div>
                <Button style={{background: 'transparent', borderColor: 'transparent'}} onClick={this.encenderModal}
                        icon={<UserOutlined/>} title='Ver perfil'/>
                <Modal
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background: '#1E1E2F', color: '#ffffff'}} onClick={this.apagarModal}>
                            Regresar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                    width={900}
                >
                    <div>
                        <h1 style={{justifyContent: 'center'}}><UserOutlined/> Perfil</h1>
                    </div>
                    <Divider/>
                    {
                        (this.state.loading) ?
                            <Spin size="large"/>
                            :
                            <div>
                                {this.state.usuarios.map((value, index) => (
                                    <div key={index}>
                                        <Row key={index} align="middle">
                                            <Col span={8}>
                                                <Avatar size={200}
                                                        style={{
                                                            color: '#000000',
                                                            backgroundImage: `url('${this.state.imagen}')`,
                                                            backgroundSize: '100% 100%'
                                                        }}>
                                                    {value.name[0]} {value.lastname[0]}
                                                </Avatar>
                                            </Col>
                                            <Col span={16}>
                                                <Card>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Nombre: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.name}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Apellido: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.lastname}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Correo: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.email}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Número de cédula: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.identificationCard}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Número de celular: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.telephoneNumber}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Dirección: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.address}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Fecha de nacimiento: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.dateOfBirth}</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row key={index}>
                                                        <Col span={12}>
                                                            <h3><b>Institución: </b></h3>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h3>{value.institution}</h3>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <div>
                                            {
                                                (value.typeUser === 'P') ?
                                                    <Card title='Currículum' style={{marginTop: '20px'}}>
                                                        <InfiniteScroll>
                                                            <Card
                                                                style={{
                                                                    height: '400px',
                                                                    overflow: 'auto',
                                                                    paddingTop: '20px',
                                                                    margin: '10px',
                                                                    background: '#55556D'
                                                                }}
                                                                title={<h4><IdcardOutlined/> Trayectoria Laboral</h4>}
                                                            >
                                                                <InfiniteScroll>
                                                                    <GetTrayectoria id={value.id}/>
                                                                </InfiniteScroll>
                                                            </Card>
                                                            <Card
                                                                style={{
                                                                    height:'400px',
                                                                    overflow:'auto',
                                                                    paddingTop:'20px',
                                                                    margin:'10px',
                                                                    background: '#55556D'
                                                                }}
                                                                title={<h4><BarsOutlined/> Proyectos</h4>}
                                                            >
                                                                <InfiniteScroll>
                                                                    <GetProyectos id={value.id}/>
                                                                </InfiniteScroll>
                                                            </Card>
                                                            <Card
                                                                style={{
                                                                    height:'400px',
                                                                    overflow:'auto',
                                                                    paddingTop:'20px',
                                                                    margin:'10px',
                                                                    background: '#55556D'
                                                                }}
                                                                title={<h4><TranslationOutlined/> Idiomas</h4>}
                                                            >
                                                                <InfiniteScroll>
                                                                    <GetIdiomas id={value.id}/>
                                                                </InfiniteScroll>
                                                            </Card>
                                                            <Card
                                                                style={{
                                                                    height: '400px',
                                                                    overflow: 'auto',
                                                                    paddingTop: '20px',
                                                                    margin: '10px',
                                                                    background: '#55556D'
                                                                }}
                                                                title={<h4><ToolOutlined/> Habilidades</h4>}
                                                            >
                                                                <InfiniteScroll>
                                                                    <GetHabilidades id={value.id}/>
                                                                </InfiniteScroll>
                                                            </Card>
                                                            <Card
                                                                style={{
                                                                    height:'400px',
                                                                    overflow:'auto',
                                                                    paddingTop:'20px',
                                                                    margin:'10px',
                                                                    background: '#55556D'
                                                                }}
                                                                title={<h4><BookOutlined/> Instrucciones Académicas</h4>}
                                                            >
                                                                <InfiniteScroll>
                                                                    <GetInstruccion id={value.id}/>
                                                                </InfiniteScroll>
                                                            </Card>
                                                            <Card
                                                                style={{
                                                                    height: '400px',
                                                                    overflow: 'auto',
                                                                    paddingTop: '20px',
                                                                    margin: '10px',
                                                                    background: '#55556D'
                                                                }}
                                                                title={<h4><ProjectOutlined/> Capacitaciones</h4>}
                                                            >
                                                                <InfiniteScroll>
                                                                    <GetCapacitaciones id={value.id}/>
                                                                </InfiniteScroll>
                                                            </Card>
                                                        </InfiniteScroll>
                                                    </Card>
                                                    :
                                                    <Card title={<><BankOutlined/> Empresa</>}
                                                          style={{marginTop: '20px'}}>
                                                        <CardGetEmpresa id={value.id}/>
                                                    </Card>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }
                </Modal>
            </div>
        )
    }
}
