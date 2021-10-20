import React from "react";
import {Card} from "antd";
import {FundOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import CardOfertas from "../components/Ofertas/CardOfertas";
export default function OfertasPage(){
    return(
        <div>
            <Card style={{paddingTop:'20px'}}>
                <h1 style={{alignContent:'center'}}><FundOutlined /> Ofertas</h1>
            </Card>
            <Card style={{height:'482px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <CardOfertas/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}