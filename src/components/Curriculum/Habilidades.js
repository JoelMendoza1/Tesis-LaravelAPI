import React from "react";
import {Card, Button} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {PlusOutlined, ToolOutlined} from "@ant-design/icons";
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
                background: '#55556D'
            }}
            title={<h1><ToolOutlined/> Habilidades</h1>}
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