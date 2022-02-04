import React from "react";
import {NotificationOutlined} from "@ant-design/icons";
import {Card, PageHeader, Typography} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import Postulaciones from "../components/PostulacionesEmpresa/Postulaciones";
const { Title } = Typography;
export default function PostularPage(){
    return(
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<Title level={4}><NotificationOutlined /> Postulaciones E</Title>}
                subTitle="En este modulo permitirá visualizar mis ofertas y ver las postulaciones de mi oferta poder aceptarlas o rechazarlas"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'80vh', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                   <Postulaciones/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}