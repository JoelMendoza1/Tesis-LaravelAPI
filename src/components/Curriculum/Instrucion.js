import React from "react";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {BookOutlined} from "@ant-design/icons";
import InstruccionCard from "./InstruccionCard";
import CrearInstruccion from "./CrearInstruccion";

export default function Instrucion() {
    return (
        <Card
            style={{
                height:'400px',
                overflow:'auto',
                paddingTop:'20px',
                margin:'10px',
                background: '#55556D'
            }}
            title={<h1><BookOutlined/> Instrucciones Academicas</h1>}
            extra={[
                <CrearInstruccion/>,
            ]}
        >
            <InfiniteScroll>
                <InstruccionCard/>
            </InfiniteScroll>
        </Card>
    )
}