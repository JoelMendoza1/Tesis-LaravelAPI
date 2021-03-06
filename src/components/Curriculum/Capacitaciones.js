import React from "react";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {ProjectOutlined} from "@ant-design/icons";
import CapacitacionCard from "./CapacitacionCard";
import CrearCapacitacion from "./CrearCapacitacion";

export default function Capacitaciones() {
    return (
        <Card
            style={{
                height:'400px',
                overflow:'auto',
                paddingTop:'20px',
                margin:'10px',
                background: '#1E1E2F'
            }}
            title={<h1 style={{color:'#ffffff'}}><ProjectOutlined/> Capacitaciones</h1>}
            extra={[
                <CrearCapacitacion/>,
            ]}
        >
            <InfiniteScroll>
                <CapacitacionCard/>
            </InfiniteScroll>
        </Card>
    )
}