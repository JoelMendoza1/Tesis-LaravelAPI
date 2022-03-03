import React from "react";
import {Card} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import TrayectoriaCollapse from "./TrayectoriaCollapse";
import { IdcardOutlined} from "@ant-design/icons";
import CrearTrayectoria from "./CrearTrayectoria";

export default function Trayectoria() {
        return (
            <Card
                style={{
                    height:'400px',
                    overflow:'auto',
                    paddingTop:'20px',
                    margin:'10px',
                    background: '#1E1E2F',
                }}
                title={<h1 style={{color:'#ffffff'}}><IdcardOutlined/> Trayectoria Laboral</h1>}
                extra={[
                    <CrearTrayectoria/>,
                ]}
            >
                <InfiniteScroll>
                    <TrayectoriaCollapse/>
                </InfiniteScroll>
            </Card>
        )
}