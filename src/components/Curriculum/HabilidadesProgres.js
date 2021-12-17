import React from "react";
import {Row, message, Progress, Card, Col, Typography, Descriptions} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import EditarHabilidad from "./EditarHabilidad";
import EliminarHabilidad from "./EliminarHabilidad";
 const {Text}= Typography;
export default class HabilidadesProgres extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            habilidades: [],
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
                this.getHabilidad(response.data.id)
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
            }
        )
    }
    getHabilidad= async (id) => {
        let url = API + 'users/'+id+'/habilidades';
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
                    habilidades:response.data
                })
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Habilidad no encontrada!")
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
                {this.state.habilidades.map((value, index) =>
                    <Card
                        key={index}
                        title={value.habilidad}
                        style={{background:'#55556D', margin:'10px'}}
                    >
                        <Row  align="middle">
                            <Col span={12}>
                                <Progress
                                    type="circle"
                                    percent={value.dominio}
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#1E1E2F',
                                    }}
                                    width={90}
                                    style={{margin:'20px'}}
                                />
                                <Text level={5}> Dominio</Text>
                            </Col>
                            <Col span={12}>
                                <Row justify="center">
                                    <Col span={6} >
                                        <EditarHabilidad id={value.id}/>
                                    </Col>
                                    <Col span={6}>
                                        <EliminarHabilidad id={value.id}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Descriptions
                            title="Descripcion:"
                            style={{ background:"#ffffff", padding:'20px'}}
                        >
                            <Descriptions.Item >{value.descripcion}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}
            </div>
        )
    }
}