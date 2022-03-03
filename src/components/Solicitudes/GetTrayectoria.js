import React from "react";
import {Collapse, List, message} from "antd";
import {AuditOutlined, CalendarOutlined, DesktopOutlined, PhoneOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";
const { Panel } = Collapse;
export default class GetTrayectoria extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            trayectoria: [],
            id:props.id
        })
    }
    componentDidMount(){
        this.getTrayectoria(this.state.id)
    }
    getTrayectoria = async (id) => {
        let url = API + 'users/'+id+'/trayectoriaslaborales';
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
                    trayectoria:response.data
                })
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
                if(this.state.c===0){
                    this.componentDidMount()
                    this.setState({c:1})
                }
            }
        )
    }
    render() {
        return(
            <div>
                <Collapse
                    bordered={false}
                    style={{background:'#55556D', margin:'10px'}}
                >
                    {this.state.trayectoria.map((value, index) =>
                        <Panel
                            header={"Empresa: "+value.empresa}
                            key={index}
                        >
                            <List style={{background:'#55556D'}}>
                                <List.Item><DesktopOutlined/> <b>Puesto de trabajo: </b> {value.puestoTrabajo}</List.Item>
                                <List.Item><AuditOutlined/> <b>Responsabilidades:</b> {value.responsabilidades}</List.Item>
                                <List.Item><CalendarOutlined/> <b>Periodo de trabajo:</b> {value.fechaInicio} a {value.fechaSalida}</List.Item>
                                <List.Item><PhoneOutlined/> <b>Contacto:</b> {value.contacto}</List.Item>
                            </List>
                        </Panel>
                    )}
                </Collapse>,
            </div>
        )
    }


}