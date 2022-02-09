import React from "react";
import { Card, Typography} from "antd";
import FormLogin from "./FormLogin";
const { Title } = Typography;
export default function ContentLogin(){

    return(
        <Card style={{
            width:'700px',
            height:'500px',
            margin: 'auto',
            marginTop:'75px',
            marginBottom:'75px',
            alignContent: 'center',
            background: "rgba(255, 255, 255, .7)",
            padding:'40px'
        }}
        >
            <Title level={2} style={{margin: 'auto', alignContent: 'center'}}>Iniciar Sesión</Title>
            <FormLogin/>
        </Card>
    )
}