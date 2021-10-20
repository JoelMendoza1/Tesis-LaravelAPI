import React from "react";
import {Card} from "antd";
import {IdcardOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
export default function CurriculumPage(){
    return(
        <div>
            <Card style={{paddingTop:'20px'}}>
                <h1 style={{alignContent:'center'}}><IdcardOutlined /> Curriculum</h1>
            </Card>
            <Card style={{height:'432px', overflow:'auto', paddingTop:'20px'}}>
                <InfiniteScroll>

                </InfiniteScroll>
            </Card>
        </div>
    )
}