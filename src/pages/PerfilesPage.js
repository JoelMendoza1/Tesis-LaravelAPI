import React from "react";
import {API} from "../services/API";
import axios from "axios";
import { Row, Col, Avatar, Card} from 'antd';
import { UserOutlined} from "@ant-design/icons";
import ModalEditUser from "../components/Perfil/ModalEditUser";

export default class PerfilesPage  extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuarios: [],
            imagen:[]
        })
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
                if (response.data.image==null){
                    const nuevoDato= "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }else{
                    const dato= response.data.image
                    const nuevoDato= "http://localhost:8000/storage"+dato.substring(6);
                    console.log(nuevoDato)
                    //response.data.image
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }


            }
        )


    }


//{value.name[0]} {value.lastname[0]}

    render(){

        return(
            <div>
                <Card style={{padding:0, margin:0,paddingTop:'20px'}}>
                    <div>
                        <Row justify="end">
                            <Col span={6}>
                                <h1><UserOutlined /> Perfil</h1>
                            </Col>
                            <Col span={6}>
                                <ModalEditUser/>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <Card style={{height:'74vh',paddingTop:'60px'}}>
                    {this.state.usuarios.map((value, index) => (

                                <div key={index} style={{width:'700px', margin:'auto'}}>
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
                                                    <h3>Número de cédula: </h3>
                                                </Col>
                                                <Col span={12}>
                                                    <h3>{value.identificationCard}</h3>
                                                </Col>
                                            </Row>
                                            <Row key={index}>
                                                <Col span={12} >
                                                    <h3>Teléfono: </h3>
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
                </Card>

            </div>
            )

    }
}