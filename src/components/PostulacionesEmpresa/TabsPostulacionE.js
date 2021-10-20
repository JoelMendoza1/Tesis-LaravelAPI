import React from "react";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class TabsPostulacionE extends React.Component{
    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        Tabla Todos
                    </TabPane>
                    <TabPane tab="Pendiente" key="2">
                        Tabla Pendientes
                    </TabPane>
                    <TabPane tab="Aceptados" key="3">
                        Tabla Aceptados
                    </TabPane>
                    <TabPane tab="Rechazados" key="4">
                        Tabla Rechazados
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
