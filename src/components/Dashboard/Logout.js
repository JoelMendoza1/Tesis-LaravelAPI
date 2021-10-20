import React from "react";
import {LogoutOutlined} from "@ant-design/icons";
import {Button} from "antd";
import useAuth from "../../auth/useAuth";

export default function Logout(){
    const auth= useAuth();
    return(
        <Button size='small' onClick={auth.logout} style={{backgroundColor:'#ffffff', color:'#1E1E2F', marginLeft:'100px', height:'30px', float: 'right', marginRight:'50px', marginTop: '10px', fontSize:'12px'}}>
            <LogoutOutlined />Cerrar sesión
        </Button>
    )
}