import React from "react";
import {Card, PageHeader, Typography} from "antd";
import {FundOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import CardOfertas from "../components/Ofertas/CardOfertas";
const { Title } = Typography;
export default function OfertasPage(){
    return(
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<Title level={4}><FundOutlined /> Ofertas</Title>}
                subTitle="En este modulo permitirá visualizar y postular las ofertas al Pasante"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'482px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <CardOfertas/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}