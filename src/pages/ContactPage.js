import React from "react";
import {Image, Card, Layout, Button, Row, Col} from "antd";
import {NavLink} from "react-router-dom";
import Routes from "../constants/routes";
import {BookFilled} from "@ant-design/icons";
import Navigation from "../components/Home/Navigation";
import stylesNavigation from "../styles/navigation.css";
import FooterComponent from "../components/FooterComponent";
import '../styles/contact.css';


const { Header, Content, Footer } = Layout;

export default function ContactPage(){
    return(
        <div className="layout-heder">
            <Layout className="layout-heder">
                <Header className="header" style={{background: "rgba(0, 0, 0, .5)"}}>
                    <div className="logo" >
                        <NavLink to={ Routes.HOME } style={{color:'#292F36'}} exact>
                            <BookFilled style={{fontSize: '100px !important', }}/>
                        </NavLink>


                    </div>

                    <Navigation className="header"/>
                </Header>
                <Content style={{ padding: '0 50px',  }} className="content">

                    <Content style={{ padding: '0 24px', minHeight: 280}} >
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
                    </Content>

                </Content>

                <Footer style={{ textAlign: 'center', backgroundColor:"#292F36" }}>
                    <FooterComponent/>
                    <div style={{marginTop:'50px', color:"#ffffff"}}>
                        Aplication ©2021 Created by Joel Mendoza
                    </div>
                </Footer>
            </Layout>

        </div>
    )
}