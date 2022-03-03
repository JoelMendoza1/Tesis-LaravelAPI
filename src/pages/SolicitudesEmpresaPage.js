import React from "react";
import {Card, PageHeader, Typography} from 'antd';
import {QuestionOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import TabsSolicitudesEmpresa from "../components/Solicitudes/TabsSolicitudesEmpresa";
const { Title } = Typography;
export default class SolicitudesEmpresaPage extends React.Component{
    render(){
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={<Title level={4}><QuestionOutlined /> Solicitudes Empresa</Title>}
                    subTitle="En este módulo te permite gestionar las solicitudes de las Empresas"
                    style={{background:"#ffffff"}}
                />
                <Card style={{height:'80vh', overflow:'auto'}}>
                    <InfiniteScroll>
                        <TabsSolicitudesEmpresa />
                    </InfiniteScroll>
                </Card>
            </div>
        )
    }

}