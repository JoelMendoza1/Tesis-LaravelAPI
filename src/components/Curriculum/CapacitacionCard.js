import React from "react";
import {Row, message, Card, Col, Typography, Button} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import {BankOutlined, CalendarOutlined, FileTextOutlined} from "@ant-design/icons";
import EditarInstruccion from "./EditarInstruccion";
import EliminarInstruccion from "./EliminarInstruccion";
import EditarInstruccionDocument from "./EditarInstruccionDocument";
const {Text}= Typography;
export default class CapacitacionCard extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            capacitaciones: [],
        })
    }
    componentDidMount(){
        this.getUser()
    }
    async getUser(){
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
                this.getCapacitacion(response.data.id)
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
            }
        )
    }
    getCapacitacion= async (id) => {
        let url = API + 'users/'+id+'/capacitacions';
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
                console.log(response.data )
                this.setState({
                    capacitaciones:response.data
                })
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Capacitacion no encontrada!")
                if(this.state.c===0){
                    this.componentDidMount()
                    this.setState({c:1})
                }
            }
        )
    }
    render(){
        return (
            <div>
                {this.state.capacitaciones.map((value, index) =>
                    <Card
                        key={index}
                        title={value.nombreCapacitacion}
                        style={{background:'#55556D', margin:'10px'}}
                    >
                        <Row  align="middle">
                            <Col span={12}>
                                <Text level={5}> <BankOutlined/> <b>Institución capacitador: </b> {value.nombreInstitucionCapacitadora}</Text><br/>
                                <Text level={5}> <CalendarOutlined/> <b>Inicio de la capacitación: </b> {value.fechaInicioCapacitacion}</Text><br/>
                                <Text level={5}> <CalendarOutlined/> <b>Fin de la capacitación: </b> {value.fechaFinCapacitacion}</Text><br/>
                            </Col>
                            <Col span={12}>
                                <Row justify="center">
                                    <Col span={6} >
                                        <EditarInstruccion id={value.id}/>
                                    </Col>
                                    <Col span={6}>
                                        <EliminarInstruccion id={value.id}/>
                                    </Col>
                                    <Col span={6}>
                                        <Button
                                            style={{
                                                background:'#237804',
                                                borderColor:'transparent'
                                            }}
                                            target="_blank"
                                            type="primary"
                                            icon={<FileTextOutlined />}
                                            shape="circle"
                                            title='Descargar certificado'
                                            //href={API+`instrucciones/${value.id}/document`}
                                            href={"http://localhost:8000/storage"+value.document.substring(6)}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <EditarInstruccionDocument id={value.id}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                )}
            </div>
        )
    }
}