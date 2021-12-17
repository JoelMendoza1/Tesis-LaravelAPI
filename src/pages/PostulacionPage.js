import React from "react";
import {Card, PageHeader, Typography} from "antd";
import {NotificationOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import TabsPostulacionP from "../components/PostulacionesPasante/TabsPostulacionP";
const { Title } = Typography;
export default function PostulacionPage(){
    return(
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<Title level={4}><NotificationOutlined /> Postulaciones P</Title>}
                subTitle="En este modulo permitirá visualizar las postulaciones hechas eliminar, ver la oferta y monitorear el estado"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'482px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <TabsPostulacionP/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}