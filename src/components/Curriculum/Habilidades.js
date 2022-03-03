import React from "react";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {ToolOutlined} from "@ant-design/icons";
import HabilidadesProgres from "./HabilidadesProgres";
import CrearHabilidad from "./CrearHabilidad";

export default function Habilidades() {
    return (
        <Card
            style={{
                height:'400px',
                overflow:'auto',
                paddingTop:'20px',
                margin:'10px',
                background: '#1E1E2F'
            }}
            title={<h1 style={{color:'#ffffff'}}><ToolOutlined/> Habilidades</h1>}
            extra={[
                <CrearHabilidad/>,
            ]}
        >
            <InfiniteScroll>
                <HabilidadesProgres/>
            </InfiniteScroll>
        </Card>
    )
}