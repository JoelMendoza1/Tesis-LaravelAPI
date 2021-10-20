import React from "react";
import {Avatar, Col, Row} from "antd";
import Logout from "./Logout";
import {API} from "../../services/API";
import axios from "axios";

export default class NavigationDashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuarios: [],
            imagen:[]
        })
    }
    componentDidMount(){
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                if (response.data.image==null){
                    const nuevoDato= "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }else{
                    const dato= response.data.image
                    const nuevoDato= "http://localhost:8000/storage"+dato.substring(6);
                    //response.data.image
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }

            }
        )
    }
    render() {
        return(
            <div>
                {this.state.usuarios.map((value, index) => (
                    <Row justify="end" key={index}>

                        <Col span={2} >
                                <Avatar
                                    src={this.state.imagen}
                                    style={{
                                        color: '#ffffff',
                                        backgroundImage: `url('${this.state.imagen}')`,
                                        backgroundSize: '100% 100%'
                                    }}>
                                    {value.name[0]} {value.lastname[0]}
                                </Avatar>
                        </Col>
                        <Col span={7} >

                                <h1 style={{color:'#ffffff'}}>{value.name} {value.lastname}</h1>
                        </Col>
                        <Col span={7}>
                            <Logout/>
                        </Col>
                    </Row>
                ))}
            </div>
        )
    }

}