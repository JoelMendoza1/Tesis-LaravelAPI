import React from "react";
import {Card, Divider} from "antd";
import {FundOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import Ofertar from "../components/Ofertar/Ofertar";
import TabsOfertar from "../components/Ofertar/TabsOfertar";
export default function OfertarPage(){
    return(
        <div>
            <Card style={{paddingTop:'20px'}}>
                <h1 style={{alignContent:'center'}}><FundOutlined /> Ofertar</h1>
            </Card>
            <Card style={{height:'482px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>
                    <Ofertar/>
                    <Divider/>
                    <TabsOfertar/>
                </InfiniteScroll>
            </Card>
        </div>
    )
}