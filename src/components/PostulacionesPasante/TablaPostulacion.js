import React from "react";
import {message, Row, Col,Alert} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import VerOferta from "../Ofertar/VerOferta";
import EliminarPostulacion from "./EliminarPostulacion";
import Search from "antd/es/input/Search";

export default class TablaPostulacion extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            ofertas: [],
            total:0,
            ruta: props.ruta
        })
    }
    componentDidMount(){
        this.getUser()
    }
    async consultaAPI(id){
        let url = API + 'users/'+id+this.state.ruta;
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
    getUser=async ()=>{
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
                <table className="default" style={{background:'#55556D', margin:'auto', borderColor:'#ffffff',borderCollapse: 'separate'}}>
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
                    <tbody style={{}}>
                    {this.state.ofertas.filter(((value) => {
                        if(!this.state.buscarTerm){
                            return value
                        }else if (value.oferta_id.oferta.toLowerCase().includes(this.state.buscarTerm.toLowerCase())){
                            return value
                        }
                    })).map((value, index) =>
                        <tr key={index}>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                {value.oferta_id.oferta}
                            </td>
                            <td>
                                {value.oferta_id.horario}
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                {value.oferta_id.numberoPostulantes}
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                {value.descripcion}
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                {
                                    (value.estadoPostulacion!==null)?
                                        (value.estadoPostulacion===0)?
                                            <Alert message="Rechazado" type="error" showIcon />
                                            :<Alert message="Aceptado" type="success" showIcon/>
                                        :
                                        <Alert message="Pendiente" type="info" showIcon/>
                                }
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <Row>
                                    <Col span={12}>
                                        <EliminarPostulacion idpostulacion={value.id}/>
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