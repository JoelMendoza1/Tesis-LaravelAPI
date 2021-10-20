import React from "react";
import { Tabs } from 'antd';
import TableTodosSolicitudes from "./TableTodosSolicitudes";
import TableAprobadasSolicitudes from "./TableAprobadasSolicitudes";
import TableReprobadasSolicitudes from "./TableReprobadasSolicitudes";
import TablePendientesSolicitudes from "./TablePendientesSolicitudes";
const { TabPane } = Tabs;

export default class TabsSolicitudes extends React.Component{
    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        <TableTodosSolicitudes/>
                    </TabPane>
                    <TabPane tab="Aprobados" key="2">
                        <TableAprobadasSolicitudes/>
                    </TabPane>
                    <TabPane tab="Pendientes" key="3">
                        <TablePendientesSolicitudes/>
                    </TabPane>
                    <TabPane tab="Rechazados" key="4">
                        <TableReprobadasSolicitudes/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
