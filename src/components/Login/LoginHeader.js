import React from "react";
import {Button, Col, Menu, Row} from "antd";
import stylesNavigation from "../../styles/navigation.css";
import Routes from "../../constants/routes";
import {NavLink} from "react-router-dom";
import {ReadOutlined} from "@ant-design/icons";

export default function LoginHeader(){

    return(
        <div>
            <Row>
                <Col span={13}>
                    <div className="logo" >
                        <NavLink to={ Routes.HOME } style={{color:'#292F36'}} exact>
                            <ReadOutlined style={{fontSize: '100px !important', color:'#ffffff' }}/>
                        </NavLink>
                    </div>
                </Col>
                <Col span={3} offset={8}>
                    <Menu mode="horizontal"  className={stylesNavigation.menu}>
                        <Menu.Item key={Routes.REGISTER} >
                            <Button style={{backgroundColor:'#292F36', color:'#ffffff'}}>
                                <NavLink to={ Routes.REGISTER } className={stylesNavigation.active} exact>Registrar</NavLink>
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}