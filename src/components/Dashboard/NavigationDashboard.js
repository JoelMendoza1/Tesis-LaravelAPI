import React from "react";
import {Avatar, Button, Menu, notification} from "antd";
import Logout from "./Logout";
import {API} from "../../services/API";
import axios from "axios";
import { InfoCircleOutlined
} from "@ant-design/icons";
import Routes from "../../constants/routes";
import {NavLink} from "react-router-dom";

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
                    <Menu mode="horizontal">
                        <Menu.Item >
                            <Button
                                type="text"
                                style={{
                                    color: '#ffffff',
                                }}
                                onClick={()=>{
                                    notification["info"]({
                                        message: `Estado de usuario `,
                                        description:value.descriptionRequest,
                                        placement:'bottomRight'
                                    })
                                }}

                            >
                                {
                                    (value.request===null)?
                                        <><InfoCircleOutlined title='Información pendiente'/> </>
                                        :<div>
                                            {
                                                (value.request===0)?
                                                    <><InfoCircleOutlined title='Usuario Rechazado'/> </>
                                                    :
                                                    <><InfoCircleOutlined title='Usuario autorizado'/></>
                                            }
                                        </div>

                                }
                            </Button>
                        </Menu.Item>
                        <Menu.Item key={Routes.DASHBOARD}>
                            <NavLink to={ Routes.DASHBOARD} style={{color:'#ffffff'}} exact>{value.name} {value.lastname}</NavLink>
                        </Menu.Item>
                        <Menu.Item key={Routes.DASHBOARD}>
                            <NavLink to={ Routes.DASHBOARD } style={{color:'#ffffff'}} exact>
                                <Avatar
                                    src={this.state.imagen}
                                    style={{
                                        color: '#ffffff',
                                        backgroundImage: `url('${this.state.imagen}')`,
                                        backgroundSize: '100% 100%'
                                    }}>
                                    {value.name[0]} {value.lastname[0]}
                                </Avatar>
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item >
                            <Logout/>
                        </Menu.Item>

                    </Menu>
                ))}
            </div>
        )
    }

}