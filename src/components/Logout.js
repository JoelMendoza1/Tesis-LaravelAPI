import React from "react";
import {LogoutOutlined} from "@ant-design/icons";
import {Button} from "antd";
import useAuth from "../auth/useAuth";


export default function Logout(){
    const auth= useAuth();
    return(
        <Button onClick={auth.logout} style={{backgroundColor:'#ffffff', color:'#1E1E2F', marginLeft:'100px', height:'40px', float: 'right', marginRight:'50px', marginTop: '10px'}}>
            <LogoutOutlined /> Cerrar Sesión
        </Button>
    )
}