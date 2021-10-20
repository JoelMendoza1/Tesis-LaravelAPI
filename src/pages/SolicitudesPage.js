import React from "react";
import {Card} from 'antd';
import {QuestionOutlined} from "@ant-design/icons";
import TabsSolicitudes from "../components/Solicitudes/TabsSolicitudes";
import InfiniteScroll from "react-infinite-scroller";
export default class SolicitudesPage extends React.Component{
    render(){
        return(
            <div>
                <Card>
                    <div >
                        <h1 style={{textAlign:'center', paddingTop:'10px'}}><QuestionOutlined /> Solicitudes</h1>
                    </div>
                </Card>
                <Card style={{height:'442px', overflow:'auto'}}>
                    <InfiniteScroll>
                        <TabsSolicitudes />
                    </InfiniteScroll>
                </Card>
            </div>
        )
    }

}