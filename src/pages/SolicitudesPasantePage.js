import React from "react";
import {Card, PageHeader, Typography} from 'antd';
import {QuestionOutlined} from "@ant-design/icons";
import TabsSolicitudesPasante from "../components/Solicitudes/TabsSolicitudesPasante";
import InfiniteScroll from "react-infinite-scroller";
const { Title } = Typography;
export default class SolicitudesPasantePage extends React.Component{
    render(){
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={<Title level={4}><QuestionOutlined /> Solicitudes Pasantes</Title>}
                    subTitle="En este módulo te permite gestionar las solicitudes de los Pasantes"
                    style={{background:"#ffffff"}}
                />
                <Card style={{height:'80vh', overflow:'auto'}}>
                    <InfiniteScroll>
                        <TabsSolicitudesPasante />
                    </InfiniteScroll>
                </Card>
            </div>
        )
    }

}