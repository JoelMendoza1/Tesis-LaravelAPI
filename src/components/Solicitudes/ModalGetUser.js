import {Avatar, Button, Col, Row, Divider, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class ModalGetUser extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuarios: [],
            imagen:[],
            modal:false,
            id: props.id,
            ok: false
        })
    }
    componentDidMount(id) {
        this.getUser(id)
    }
    getUser=async (id)=>{
        let url = API + 'users/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                if (response.data.image==null){
                    const nuevoDato= "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }else{
                    const dato= response.data.image
                    const nuevoDato= "http://localhost:8000/storage"+dato.substring(6);
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }
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
            <Button style={{background:'transparent', borderColor:'transparent'}} onClick={this.encenderModal}> <UserOutlined /> Ver Perfil</Button>
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
                    <h1 style={{justifyContent:'center'}}><UserOutlined /> Perfil</h1>
                </div>
                <Divider />
                    {this.state.usuarios.map((value, index) => (
                    <div key={index}>
                        <Row key={index}>
                            <Col span={12} >
                                <Avatar size={200}
                                        style={{
                                            color: '#000000',
                                            backgroundImage: `url('${this.state.imagen}')`,
                                            backgroundSize: '100% 100%'
                                        }}>
                                    {value.name[0]} {value.lastname[0]}
                                </Avatar>
                            </Col>
                            <Col span={12}>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Nombre: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.name}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Apellido: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.lastname}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Email: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.email}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Número de cedula: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.identificationCard}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Número de celular: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.telephoneNumber}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Dirección: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.address}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Fecha de nacimiento: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.dateOfBirth}</h3>
                                    </Col>
                                </Row>
                                <Row key={index}>
                                    <Col span={12} >
                                        <h3>Institución: </h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>{value.institution}</h3>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Modal >
        </div>
    )
    }
}
