import React from "react";
import {Collapse, message, List,Row, Col} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import {
    DesktopOutlined,
    AuditOutlined,
    PhoneOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import EditarTrayectoria from "./EditarTrayectoria";
import EliminarTrayectoria from "./EliminarTrayectoria";
const { Panel } = Collapse;
export default class TrayectoriaCollapse extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            trayectoria: [],
        })
    }
    componentDidMount() {
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
                this.getTrayectoria(response.data.id)
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
            }
        )
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
    render(){
        return (
            <div>

                <Collapse
                    bordered={false}
                    style={{background:'#55556D', margin:'10px'}}
                >
                    {this.state.trayectoria.map((value, index) =>
                    <Panel
                        header={"Empresa: "+value.empresa}
                        key={index}
                        extra={
                            <div>
                                <Row>
                                    <Col span={12}>
                                        <EditarTrayectoria id={value.id}/>
                                    </Col>
                                    <Col span={12}>
                                        <EliminarTrayectoria id={value.id}/>
                                    </Col>
                                </Row>
                            </div>
                        }
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