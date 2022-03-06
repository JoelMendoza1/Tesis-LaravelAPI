import React from "react";
import {Card, Divider, PageHeader, Typography} from "antd";
import {FundOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import Ofertar from "../components/Ofertar/Ofertar";
import TabsOfertar from "../components/Ofertar/TabsOfertar";
const { Title } = Typography;
export default function OfertarPage(){
    return(
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<Title level={4}><FundOutlined /> Ofertar</Title>}
                subTitle="En este modulo permite gestionar las ofertas"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'80vh', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <Ofertar/>
                    <Divider/>
                    <TabsOfertar/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}