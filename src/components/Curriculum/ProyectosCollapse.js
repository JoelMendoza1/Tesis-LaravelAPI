import React from "react";
import {Collapse, message, List, Col,Row} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import {FileTextOutlined, ShareAltOutlined} from "@ant-design/icons";
import EditarProyecto from "./EditarProyecto";
import EliminarProyecto from "./EliminarProyecto";
const { Panel } = Collapse;
export default class ProyectosCollapse extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            proyectos: [],
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
                this.getProyectos(response.data.id)
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
            }
        )
    }
    getProyectos = async (id) => {
        let url = API + 'users/'+id+'/proyectos';
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
                    proyectos:response.data
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
                    style={{background:'#1E1E2F', margin:'10px'}}
                >
                    {this.state.proyectos.map((value, index) =>
                        <Panel
                            header={"Proyecto: "+value.proyecto}
                            className="site-collapse-custom-panel"
                            key={index}
                            extra={
                                <div>
                                    <Row>
                                        <Col span={12}>
                                            <EditarProyecto id={value.id}/>
                                        </Col>
                                        <Col span={12}>
                                            <EliminarProyecto id={value.id}/>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        >
                            <List>
                                <List.Item style={{color:'#ffffff'}}><FileTextOutlined/> <b>Descripción: </b>{value.description}</List.Item>
                                <List.Item style={{color:'#ffffff'}}><ShareAltOutlined/> <b>Link: </b> <a href={value.link}>{value.link}</a></List.Item>
                            </List>
                        </Panel>
                    )}
                </Collapse>,
            </div>
        )
    }
}