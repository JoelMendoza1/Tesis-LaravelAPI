import React from "react";
import { Tabs } from 'antd';
import TablaPostulacion from "./TablaPostulacion";

const { TabPane } = Tabs;

export default class TabsPostulacionP extends React.Component{
    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        <TablaPostulacion/>
                    </TabPane>
                    <TabPane tab="Pendientes" key="2">
                        <TablaPostulacion/>
                    </TabPane>
                    <TabPane tab="Aprobados" key="3">
                        <TablaPostulacion/>
                    </TabPane>
                    <TabPane tab="Rechazados" key="4">
                        <TablaPostulacion/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
