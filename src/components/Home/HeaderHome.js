import React from "react";
import {ReadOutlined } from '@ant-design/icons';
import Navigation from "./Navigation";
import Routes from "../../constants/routes";
import {NavLink} from "react-router-dom";
import {Col, Row} from "antd";
export default function HeaderHome(){
    return(
        <div>
            <Row>
                <Col span={4}>
                    <div className="logo" >
                        <NavLink to={ Routes.HOME } style={{color:'#292F36'}} exact>
                            <ReadOutlined style={{fontSize: '100px !important', color:'#ffffff' }}/>
                        </NavLink>
                    </div>
                </Col>
                <Col span={12} offset={8}>
                    <Navigation className="header"/>
                </Col>
            </Row>
        </div>
    )
}