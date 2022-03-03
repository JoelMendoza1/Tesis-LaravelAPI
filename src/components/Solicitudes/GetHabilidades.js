import React from "react";
import {Card, Descriptions, message, Progress, Typography} from "antd";
import {API} from "../../services/API";
import axios from "axios";
const {Text}= Typography;
export default class GetHabilidades extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            habilidades: [],
            id: props.id
        })
    }
    componentDidMount(){
        this.getHabilidad(this.state.id)
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
    render() {
        return(
            <div>
                {this.state.habilidades.map((value, index) =>
                    <Card
                        key={index}
                        title={value.habilidad}
                        style={{background:'#55556D', margin:'10px'}}
                    >
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