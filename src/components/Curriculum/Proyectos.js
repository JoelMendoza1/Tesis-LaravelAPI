import React from "react";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {BarsOutlined} from "@ant-design/icons";
import ProyectosCollapse from "./ProyectosCollapse";
import CrearProyecto from "./CrearProyecto";

export default function Proyectos() {
    return (
        <Card
            style={{
                height:'400px',
                overflow:'auto',
                paddingTop:'20px',
                margin:'10px',
                background: '#1E1E2F'
            }}
            title={<h1 style={{color:'#ffffff'}}><BarsOutlined/> Proyectos</h1>}
            extra={[
                <CrearProyecto/>,
            ]}
        >
            <InfiniteScroll>
                <ProyectosCollapse/>
            </InfiniteScroll>
        </Card>
    )
}