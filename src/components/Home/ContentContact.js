import React from "react";
import Routes from "../../constants/routes";
import {NavLink} from "react-router-dom";
import {Button, Card, Col, Image, Row} from "antd";
import FooterComponent from "../FooterComponent";
import stylesNavigation from "../../styles/navigation.css";
import ImagenGaby from '../../data/Gaby.jpeg';
import ImagenJoel from '../../data/IMG_20200526_174338.jpg';
export default function ContentContact(){
    return(
        <Card className="card-contact" type="inner">
            <div>
                <Row>
                    <Col span={12}>
                        <Image
                            width={100}
                            src={ImagenJoel}
                            className='imgRedonda'
                        />
                    </Col>
                    <Col span={12}>
                        <Image
                            width={100}
                            src={ImagenGaby}
                            className='imgRedonda'
                        />
                    </Col>
                </Row>
            </div>
            <FooterComponent/>
            <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                <NavLink to={ Routes.REGISTER } className={stylesNavigation.active} exact>Regístrate!!</NavLink>
            </Button>
        </Card>
    )
}