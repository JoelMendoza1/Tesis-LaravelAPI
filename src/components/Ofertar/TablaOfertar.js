import React from "react";
import {message,Row, Col} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import EliminarOferta from "./EliminarOferta";
import OcultarOferta from "./OcultarOferta";
import PublicarOferta from "./PublicarOferta";
import VerOferta from "./VerOferta";
import EditarOfertas from "./EditarOfertas";
import Search from "antd/es/input/Search";
export default class TablaOfertar extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            ofertas: [],
            total:0,
            rutaEmpresa: props.rutaEmpresa,
            rutaOferta: props.rutaOferta
        })
    }
    componentDidMount(){
        this.getUser()
    }
    async consultaAPI(id){
        let url = API + this.state.rutaEmpresa+id+this.state.rutaOferta;
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
                })
                console.log(this.state.ofertas)
            }
        ).catch(e=>{
            console.log(e.response)
        })
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
                <table className="default" style={{background:'#ffffff', margin:'auto', border:'#1E1E2F'}} border="1">
                    <thead style={{background:'#1E1E2F', color:'#ffffff',borderColor:'#ffffff'}}>
                    <tr>
                        <th style={{width:'150px'}}>Oferta</th>
                        <th style={{width:'200px'}}>Descripción</th>
                        <th style={{width:'150px'}}>Horario laboral</th>
                        <th style={{width:'70px'}}>Número de postulantes</th>
                        <th style={{width:'200px'}}>Dirección</th>
                        <th style={{width:'200px'}}>Carrera</th>
                        <th style={{width:'200px'}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.ofertas.filter(((value) => {
                        if(!this.state.buscarTerm){
                            return value
                        }else if (value.oferta.toLowerCase().includes(this.state.buscarTerm.toLowerCase())){
                            return value
                        }
                    })).map((value, index) =>
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
                                        {
                                            (value.visible) ? <OcultarOferta id={value.id}/>:
                                                <PublicarOferta id={value.id}/>
                                        }
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