import React from "react";
import {NotificationOutlined} from "@ant-design/icons";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import Postulaciones from "../components/PostulacionesEmpresa/Postulaciones";

export default function PostularPage(){
    return(
        <div>
            <Card style={{paddingTop:'20px'}}>
                <h1 style={{alignContent:'center'}}><NotificationOutlined /> Postulaciones E</h1>
            </Card>
            <Card style={{height:'482px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                   <Postulaciones/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}