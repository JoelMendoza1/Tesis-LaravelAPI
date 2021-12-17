import React from "react";
import {Card, Button} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {BookOutlined, PlusOutlined, ProjectOutlined} from "@ant-design/icons";
import CapacitacionCard from "./CapacitacionCard";

export default function Capacitaciones() {
    return (
        <Card
            style={{
                height:'400px',
                overflow:'auto',
                paddingTop:'20px',
                margin:'10px',
                background: '#55556D'
            }}
            title={<h1><ProjectOutlined/> Capacitaciones</h1>}
            extra={[
                <Button
                    style={{
                        background:'#237804',
                        borderColor:'transparent'
                    }}
                    type="primary"
                    icon={<PlusOutlined />}
                    shape="circle"
                    title='Crear'
                />,
            ]}
        >
            <InfiniteScroll>
                <CapacitacionCard/>
            </InfiniteScroll>
        </Card>
    )
}