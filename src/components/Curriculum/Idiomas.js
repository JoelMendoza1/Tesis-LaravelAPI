import React from "react";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {TranslationOutlined} from "@ant-design/icons";
import IdiomasProgres from "./IdiomasProgres";
import CrearIdioma from "./CrearIdioma";

export default function Idiomas() {
    return (
        <Card
            style={{
                height:'400px',
                overflow:'auto',
                paddingTop:'20px',
                margin:'10px',
                background: '#55556D'
            }}
            title={<h1><TranslationOutlined/> Idiomas</h1>}
            extra={[
                <CrearIdioma/>,
            ]}
        >
            <InfiniteScroll>
                <IdiomasProgres/>
            </InfiniteScroll>
        </Card>
    )
}