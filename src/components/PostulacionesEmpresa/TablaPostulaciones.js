import React from "react";
import {Row, Col, Alert, Avatar} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import ModalGetUser from "../Solicitudes/ModalGetUser";
import AprobarPostulacion from "./AprobarPostulacion";
import RechazarPostulacion from "./RechazarPostulacion";
import {URLH} from "../../services/URLH";

export default class TablaPostulaciones extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            ofertas: [],
            total:0,
            ruta: props.ruta
        })
    }
    componentDidMount(){
        this.consultaAPI()
    }
    async consultaAPI(){
        let url = API + 'ofertas/'+this.props.idoferta+this.state.ruta;
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
        ).catch(e=>{
            console.log(e.response)
        })
    }

    render() {
        return(
            <div>
                <h1 align='center'>MIS POSTULACIONES</h1>
                <table className="default" style={{background:'#ffffff', margin:'auto', border:'#1E1E2F'}} border="1">
                    <thead style={{background:'#1E1E2F', color:'#ffffff',borderColor:'#ffffff'}}>
                    <tr>
                        <th style={{width:'200px'}}>Usuario</th>
                        <th style={{width:'200px'}}>Estado postulación</th>
                        <th style={{width:'170px'}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.ofertas.map((value, index) =>
                        <tr key={index}>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <Avatar
                                    style={{
                                        color: '#000000',
                                        backgroundImage: `url('${URLH}storage${value.user_id.image.substring(6)}')`,
                                        backgroundSize: '100% 100%',
                                        marginRight:'10px'
                                    }}>
                                    {value.user_id.name[0]} {value.user_id.lastname[0]}
                                </Avatar>{value.user_id.name} {value.user_id.lastname}
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
                                    <Col span={15}>
                                        {
                                            (value.estadoPostulacion!==null)?
                                                (value.estadoPostulacion===0)?
                                                    <AprobarPostulacion id={value.id}/>
                                                    :<RechazarPostulacion id={value.id}/>
                                                :
                                                <Row>
                                                    <Col span={12}>
                                                        <AprobarPostulacion id={value.id}/>
                                                    </Col>
                                                    <Col span={12}>
                                                        <RechazarPostulacion id={value.id}/>
                                                    </Col>
                                                </Row>
                                        }


                                    </Col>
                                    <Col span={9}>
                                        <ModalGetUser id={value.user_id.id}/>
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