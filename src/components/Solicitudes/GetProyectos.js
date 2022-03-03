import React from "react";
import {Collapse, List, message} from "antd";
import {FileTextOutlined, ShareAltOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";
const { Panel } = Collapse;
export default class GetProyectos extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            proyectos: [],
            id:props.id
        })
    }
    componentDidMount(){
        this.getProyectos(this.state.id)
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
    render() {
        return(
            <div>
                <Collapse
                    bordered={false}
                    style={{background:'#55556D', margin:'10px'}}
                >
                    {this.state.proyectos.map((value, index) =>
                        <Panel
                            header={"Proyecto: "+value.proyecto}
                            className="site-collapse-custom-panel"
                            key={index}
                        >
                            <List>
                                <List.Item><FileTextOutlined/> <b>Descripción: </b>{value.description}</List.Item>
                                <List.Item><ShareAltOutlined/> <b>Link: </b> <a href={value.link}>{value.link}</a></List.Item>
                            </List>
                        </Panel>
                    )}
                </Collapse>
            </div>
        )
    }
}