import React from "react";
import {Card, PageHeader, Typography} from 'antd';
import {QuestionOutlined} from "@ant-design/icons";
import TabsSolicitudes from "../components/Solicitudes/TabsSolicitudes";
import InfiniteScroll from "react-infinite-scroller";
const { Title } = Typography;
export default class SolicitudesPage extends React.Component{
    render(){
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={<Title level={4}><QuestionOutlined /> Solicitudes</Title>}
                    subTitle="En este modulo permitirá al Administrador rechazar, aprobar, ver perfil y descargar el documento de comprobación"
                    style={{background:"#ffffff"}}
                />
                <Card style={{height:'80vh', overflow:'auto'}}>
                    <InfiniteScroll>
                        <TabsSolicitudes />
                    </InfiniteScroll>
                </Card>
            </div>
        )
    }

}