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
                background: '#1E1E2F'
            }}
            title={<h1 style={{color:'#ffffff'}}><TranslationOutlined/> Idiomas</h1>}
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