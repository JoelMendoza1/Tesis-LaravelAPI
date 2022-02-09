import React from "react";
import {ReadOutlined } from '@ant-design/icons';
import Navigation from "./Navigation";
import Routes from "../../constants/routes";
import {NavLink} from "react-router-dom";
import {Button, Card, Typography} from "antd";
import stylesNavigation from "../../styles/navigation.css";
import {Content} from "antd/es/layout/layout";
const { Title } = Typography;
export default function ContentHome(){
    return(
        <Content style={{ padding: '0 24px', minHeight: 280, height: '560px'}} >
            <Card className="card-home" type="inner">
                <Title level={2} style={{color: '#ffffff'}}>Obtener experiencia laboral no está tan lejos, la oportunidad está a tan solo un click de distancia</Title>
                <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                    <NavLink to={ Routes.REGISTER } className={stylesNavigation.active} exact>Registrar</NavLink>
                </Button>
            </Card>
        </Content>
    )
}