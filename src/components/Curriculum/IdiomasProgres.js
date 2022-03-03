import React from "react";
import {Row, message, Progress, Card, Col, Typography} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import EditarIdioma from "./EditarIdioma";
import EliminarIdioma from "./EliminarIdioma";

const {Text}=Typography;
export default class IdiomasProgres extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            idiomas: [],
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
                this.getIdioma(response.data.id)
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
            }
        )
    }
    getIdioma= async (id) => {
        let url = API + 'users/'+id+'/idiomas';
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
                    idiomas:response.data
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
                    {this.state.idiomas.map((value, index) =>
                        <Card
                            key={index}
                            title={<h4 style={{color:'#ffffff'}}>{value.idioma}</h4>}
                            style={{background:'#1E1E2F', margin:'10px'}}
                        >
                            <Row  align="middle">
                                <Col span={12}>
                                    <Progress
                                        type="circle"
                                        percent={value.nivel}
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#55556D',
                                        }}
                                        format={percent => <h4 style={{color:'#ffffff'}}>{value.nivel}%</h4>}
                                        width={90}
                                        style={{margin:'20px', collor: '#ffffff'}}
                                    />
                                    <Text level={5} style={{color:'#ffffff'}}> Dominio</Text>
                                </Col>
                                <Col span={12}>
                                    <Row justify="center">
                                        <Col span={6}>
                                            <EditarIdioma id={value.id}/>
                                        </Col>
                                        <Col span={6}>
                                            <EliminarIdioma id={value.id}/>
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