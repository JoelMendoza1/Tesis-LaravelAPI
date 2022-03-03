import React from "react";
import { Tabs } from 'antd';
import TableSolicitudes from "./TableSolicitudes";
const { TabPane } = Tabs;

export default class TabsSolicitudesPasante extends React.Component{
    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        <TableSolicitudes ruta={'usersPasantes'}/>
                    </TabPane>
                    <TabPane tab="Aprobados" key="2">
                        <TableSolicitudes ruta={'aprobadosPasantes'}/>
                     </TabPane>
                    <TabPane tab="Pendientes" key="3">
                        <TableSolicitudes ruta={'pendientesPasantes'}/>
                    </TabPane>
                    <TabPane tab="Rechazados" key="4">
                        <TableSolicitudes ruta={'rechazadosPasantes'}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
