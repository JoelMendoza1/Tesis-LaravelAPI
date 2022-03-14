import {Avatar, Col, Row, Card, message, Spin} from "antd";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import {URLH} from "../../services/URLH";

export default class CardGetEmpresa extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            empresa: [],
            imagen:"",
            id: props.id,
            ok: false,
            loading:true
        })
    }
    componentDidMount() {
        this.getEmpresa(this.state.id)
    }
    getEmpresa=async(id)=>{
        console.log(id)
        let url = API + 'users/'+id+'/empresas';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    empresa:[response.data],
                    imagen:response.data.imagen,
                    loading:false
                })

            }
        ).catch(
            e=>{
                console.log(this.state.empresa)
                console.log(e.message)
                message.error("Empresa no encontrada!")
            }
        )
    }
    render(){

        return(
            <div>
                {
                    (this.state.loading)?
                        <Spin size="large" />
                        :
                        <div>
                            {this.state.empresa.map((value, index) => (
                                <div key={index} style={{marginTop:'20px'}}>
                                    <Row key={index} align="middle">
                                        <Col span={12} >
                                            <Avatar size={200}
                                                    style={{
                                                        color: '#000000',
                                                        backgroundImage: `${URLH}storage${value.imagen.substring(6)}')`,
                                                        backgroundSize: '100% 100%'
                                                    }}>
                                                {value.nombreEmpresa[0]}{value.nombreEmpresa[1]}
                                            </Avatar>
                                        </Col>
                                        <Col span={12}>
                                            <Card>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>Empresa: </h3>
                                                    </Col>
                                                    <Col span={12}>
                                                        <h3>{value.nombreEmpresa}</h3>
                                                    </Col>
                                                </Row>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>RUC: </h3>
                                                    </Col>
                                                    <Col span={12}>
                                                        <h3>{value.RUC}</h3>
                                                    </Col>
                                                </Row>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>Tipo de empresa: </h3>
                                                    </Col>
                                                    <Col span={12}>
                                                        <h3>{value.tipoEmpresa}</h3>
                                                    </Col>
                                                </Row>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>Teléfono: </h3>
                                                    </Col>
                                                    <Col span={12}>
                                                        <h3>{value.telefonoEmpresa}</h3>
                                                    </Col>
                                                </Row>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>Correo: </h3>
                                                    </Col>
                                                    <Col span={12}>
                                                        <h3>{value.emailEmpresa}</h3>
                                                    </Col>
                                                </Row>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>Dirección: </h3>
                                                    </Col>
                                                    <Col span={12}>
                                                        <h3>{value.direccionEmpresa}</h3>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>

                }

            </div>
        )
    }
}
