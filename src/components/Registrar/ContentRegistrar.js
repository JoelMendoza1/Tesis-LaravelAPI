import React from "react";
import { Card, Typography} from "antd";
import FormRegistrar from "./FormRegistrar";
const { Title } = Typography;
export default function ContentRegistrar(){

    return(
        <Card style={{
            width:'700px',
            height:'700px',
            margin: 'auto',
            marginTop:'40px',
            marginBottom:'30px',
            alignContent: 'center',
            background: "rgba(255, 255, 255, .7)",
            padding:'40px'
        }}
        >
            <Title level={2} >Registrar</Title>

            <FormRegistrar/>
        </Card>
    )
}