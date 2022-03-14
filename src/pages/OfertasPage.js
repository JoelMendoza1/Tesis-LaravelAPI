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
                subTitle="Este módulo te permite postular a las ofertas de mi preferencia"
                style={{background:"#ffffff"}}
            />
            <Card style={{height:'80vh', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <CardOfertas/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}