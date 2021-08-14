import React from "react";
import { Row, Col } from 'antd';
import '../styles/FoeterComponent.css';
import {MailOutlined, PhoneOutlined, GithubOutlined} from "@ant-design/icons";

export default function FooterComponent(){

    return(
        <div className='footer-components'>
            <div>
                <Row>
                    <Col span={12}>
                        <MailOutlined />
                        <a style={{marginLeft:'10px', color:"#ffffff"}} href='' target="_blank"> wester.mendoza@epn.edu.ec</a>
                    </Col>
                    <Col span={12}>
                        <MailOutlined />
                        <a style={{marginLeft:'10px', color:"#ffffff"}} href='' target="_blank"> gabriela.garcia@epn.edu.ec</a>

                    </Col>

                </Row>

            </div>
            <div>
                <Row>
                    <Col span={12}>
                        <PhoneOutlined />
                        <a style={{marginLeft:'10px', color:"#ffffff"}} href='https://wa.me/qr/7STHNRYSYQ3SK1' target="_blank"> +593-99-251-4455</a>
                    </Col>
                    <Col span={12}>
                        <PhoneOutlined />
                        <a style={{marginLeft:'10px', color:"#ffffff"}} href='https://wa.me/qr/7STHNRYSYQ3SK1' target="_blank"> +593-98-757-1481</a>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col span={12}>
                        <GithubOutlined />
                        <a style={{marginLeft:'10px', color:"#ffffff"}} href='https://github.com/JoelMendoza1' target="_blank"> JoelMendoza1</a>
                    </Col>
                    <Col span={12}>
                        <GithubOutlined />
                        <a style={{marginLeft:'10px', color:"#ffffff"}} href='https://github.com/Gabiita' target="_blank"> Gabiita</a>
                    </Col>
                </Row>
            </div>




        </div>
    )
}