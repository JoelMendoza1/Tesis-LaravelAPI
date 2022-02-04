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
                subTitle="En este modulo permitirá ver mis postulaciones, editarlas y eliminarlas"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'80vh', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <TabsPostulacionP/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}