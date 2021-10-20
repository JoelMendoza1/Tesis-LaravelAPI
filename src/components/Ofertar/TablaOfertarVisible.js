import React from "react";
import {Col, message, Row} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import EliminarOferta from "./EliminarOferta";
import OcultarOferta from "./OcultarOferta";
import EditarOfertas from "./EditarOfertas";
import VerOferta from "./VerOferta";

export default class TablaOfertarVisible extends React.Component{
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
        let url = API + 'empresas/'+id+'/visibles';
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
                console.log(response.data)
                this.setState({
                    ofertas: response.data,
                    total: response.data.length,
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
            <div>
                <h1 align='center'>MIS OFERTAS</h1>
                <table className="default" style={{background:'#3A506B', margin:'auto', borderColor:'#ffffff'}}>
                    <thead style={{background:'#1E1E2F', color:'#ffffff',borderColor:'#ffffff'}}>
                    <tr>
                        <th style={{width:'150px'}}>Oferta</th>
                        <th style={{width:'200px'}}>Descripción</th>
                        <th style={{width:'150px'}}>Horario</th>
                        <th style={{width:'70px'}}>Número de postulantes</th>
                        <th style={{width:'200px'}}>Dirección</th>
                        <th style={{width:'200px'}}>Carrera</th>
                        <th style={{width:'200px'}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.ofertas.map((value, index) =>
                        <tr key={index}>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5 >{value.oferta}</h5>
                            </td>
                            <td>
                                <h5>{value.descripcionOferta}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5>{value.horario}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5>{value.numberoPostulantes}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5>{value.direcionOferta}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5>{value.carreraOferta}</h5>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <Row>
                                    <Col span={6}>
                                        <EditarOfertas id={value.id}/>
                                    </Col>
                                    <Col span={6}>
                                        <EliminarOferta idoferta={value.id}/>
                                    </Col>
                                    <Col span={6}>
                                        <OcultarOferta id={value.id}/>
                                    </Col>
                                    <Col span={6}>
                                        <VerOferta id={value.id}/>
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