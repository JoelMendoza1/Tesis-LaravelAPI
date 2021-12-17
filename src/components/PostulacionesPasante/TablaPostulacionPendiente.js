import React from "react";
import {message, Row, Col, Button,Alert} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import VerOferta from "../Ofertar/VerOferta";
import {DeleteOutlined} from "@ant-design/icons";

export default class TablaPostulacionPendiente extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            ofertas: [],
            total:0
        })
    }
    componentDidMount(){
        this.getUser()
    }
    async consultaAPI(id){
        let url = API + 'users/'+id+'/postulacionsPendiente';
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
                this.consultaAPI(response.data.id)
            }
        ).catch(
            e=>{
                console.log(this.state.empresa)
                console.log(e.message)
                message.error("Usuario no encontrado!")
            }
        )
    }

    render() {
        return(
            <div>
                <h1 align='center'>MIS POSTULACIONES</h1>
                <table className="default" style={{background:'#55556D', margin:'auto', borderColor:'#ffffff'}}>
                    <thead style={{background:'#1E1E2F', color:'#ffffff',borderColor:'#ffffff'}}>
                    <tr>
                        <th style={{width:'300px'}}>Oferta</th>
                        <th style={{width:'150px'}}>Horario</th>
                        <th style={{width:'70px'}}>Número de postulantes</th>
                        <th style={{width:'200px'}}>Descripción Postulación</th>
                        <th style={{width:'200px'}}>Estado postulación</th>
                        <th style={{width:'120px'}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.ofertas.map((value, index) =>
                        <tr key={index}>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5 >{value.oferta_id.oferta}</h5>
                            </td>
                            <td>
                                <h5>{value.oferta_id.horario}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5>{value.oferta_id.numberoPostulantes}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h4>{value.descripcion}</h4>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                        <Alert message="Pendiente" type="info" showIcon/>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <Row>
                                    <Col span={12}>
                                        <Button type="primary" danger  shape="circle" icon={<DeleteOutlined />} title="Eliminar Postulación"/>
                                    </Col>
                                    <Col span={12}>
                                        <VerOferta id={value.oferta_id.id}/>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h5>Total {this.state.total} items</h5>
            </div>
        )
    }
}