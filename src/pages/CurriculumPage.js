import React from "react";
import {Card, Row, Col,PageHeader} from "antd";
import {IdcardOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import Trayectoria from "../components/Curriculum/Trayectoria";
import Proyectos from "../components/Curriculum/Proyectos";
import Idiomas from "../components/Curriculum/Idiomas";
import Habilidades from "../components/Curriculum/Habilidades";
import Instrucion from "../components/Curriculum/Instrucion";
import Capacitaciones from "../components/Curriculum/Capacitaciones";
export default function CurriculumPage(){
    return(
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<h1 style={{alignContent:'center'}}><IdcardOutlined /> Currículum</h1>}
                subTitle="En este módulo permite gestionar un currículum de un pasante"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'80vh', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <Row>
                        <Col span={12}>
                            <Trayectoria/>
                        </Col>
                        <Col span={12}>
                            <Proyectos/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Idiomas/>
                        </Col>
                        <Col span={12}>
                            <Habilidades/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Instrucion/>
                        </Col>
                        <Col span={12}>
                            <Capacitaciones/>
                        </Col>
                    </Row>
                </InfiniteScroll>
            </Card>
        </div>
    )
}