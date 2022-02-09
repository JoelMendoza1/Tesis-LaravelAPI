import React from "react";
import { Card, Layout, Affix} from "antd";
import FooterComponent from "../components/FooterComponent";
import About from "../components/Home/About";
import '../styles/about.css';
import 'antd/dist/antd.css';
import HeaderHome from "../components/Home/HeaderHome";
const { Header, Content, Footer } = Layout;
export default function AboutPages(){
    return(
        <div className="layout-heder">
            <Layout className='layout-heder'>
                <Affix offsetTop={0}>
                <Header className="header" style={{background: "rgba(0, 0, 0, .5)"}}>
                    <HeaderHome/>
                </Header>
                </Affix>
                <Content style={{ padding: '0 50px', height: '800px !important'}} >
                    <Content style={{ padding: '0 24px', marginBottom:'100px' }} >
                        <Card className="card-about" type="inner" >
                            <About/>
                        </Card>
                    </Content>
                </Content>
                <Footer style={{ textAlign: 'center' , backgroundColor:"#292F36"}}>
                    <FooterComponent/>
                    <div style={{marginTop:'50px', color:"#ffffff"}}>
                        Aplication ©2021 Created by Joel Mendoza
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}