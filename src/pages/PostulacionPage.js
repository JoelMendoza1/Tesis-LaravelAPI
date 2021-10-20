import React from "react";
import {Card} from "antd";
import {NotificationOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import TabsPostulacionP from "../components/PostulacionesPasante/TabsPostulacionP";
export default function PostulacionPage(){
    return(
        <div>
            <Card style={{paddingTop:'20px'}}>
                <h1 style={{alignContent:'center'}}><NotificationOutlined /> Postulaciones P</h1>
            </Card>
            <Card style={{height:'482px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <TabsPostulacionP/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}