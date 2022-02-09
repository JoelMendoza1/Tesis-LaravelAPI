import React from "react";
import Routes from "../../constants/routes";
import {NavLink} from "react-router-dom";
import {Button, Card, Col, Image, Row} from "antd";
import FooterComponent from "../FooterComponent";
import stylesNavigation from "../../styles/navigation.css";
export default function ContentContact(){
    return(
        <Card className="card-contact" type="inner">
            <div>
                <Row>
                    <Col span={12}>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            className='imgRedonda'
                        />
                    </Col>
                    <Col span={12}>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            className='imgRedonda'
                        />
                    </Col>
                </Row>
            </div>
            <FooterComponent/>
            <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                <NavLink to={ Routes.REGISTER } className={stylesNavigation.active} exact>Registrate!!</NavLink>
            </Button>
        </Card>
    )
}