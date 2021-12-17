import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import {Col, Row, Card, Avatar, message} from "antd";
import ModalEditEmpresa from "./ModalEditEmpresa";
import ModalCrearEmpresa from "./ModalCrearEmpresa";
export default class MiEmpresa extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            empresa:[],
            user_id: 0

        })
    }
    getUser=async ()=>{
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                this.setState({
                    user_id:response.data.id
                })
                message.success("Usuario encontrado! "+ response.data.id)
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
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    empresa:[response.data]
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
    componentDidMount() {
        this.getUser();
    }
    render() {
        return(
            <div >
                <Card style={{height:'432px', overflow:'auto', paddingTop:'60px'}}>
                {
                    (this.state.empresa.length!==0) ?
                        <InfiniteScroll>
                                {this.state.empresa.map((value, index) => (
                                    <div key={index} style={{width:'700px', margin:'auto'}}>
                                        <Row key={index}>
                                            <Col span={12} >
                                                <Card style={{width:250, paddingTop:'20px'}}>
                                                    <Avatar size={200}
                                                            style={{
                                                                color: '#000000',
                                                                backgroundImage: `url('http://localhost:8000/storage${value.imagen.substring(6)}')`,
                                                                backgroundSize: '100% 100%',
                                                            }}/>
                                                    <h1 align='center'>{value.nombreEmpresa}</h1>
                                                </Card>
                                                <div style={{paddingTop:'30px'}}>
                                                    <Row key={index}>
                                                        <Col span={12} >
                                                            <ModalEditEmpresa idempresa={value.id} iduser={this.state.user_id}/>
                                                        </Col>
                                                        <Col span={12}
                                                        //<EliminarEmpresa idempresa={value.id}/>
                                                        >
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <Row key={index}>
                                                    <Col span={12} >
                                                        <h3>Razón Social: </h3>
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
                                                        <h3>Email: </h3>
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
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                        </InfiniteScroll>
                        :
                        <div>
                            <ModalCrearEmpresa iduser={this.state.user_id}/>
                        </div>
                }
                </Card>
            </div>
        )
    }
}