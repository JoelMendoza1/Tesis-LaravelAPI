import React from "react";
import { Tabs } from 'antd';
import TablaPostulacion from "./TablaPostulacion";
import TablaPostulacionPendiente from "./TablaPostulacionPendiente";
import TablaPostulacionAprobado from "./TablaPostulacionAprobado";
import TablaPostulacionRechazado from "./TablaPostulacionRechazado";

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
                        <TablaPostulacionPendiente/>
                    </TabPane>
                    <TabPane tab="Aprobados" key="3">
                        <TablaPostulacionAprobado/>
                    </TabPane>
                    <TabPane tab="Rechazados" key="4">
                        <TablaPostulacionRechazado/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
