import React from "react";
import { Tabs } from 'antd';
import TableSolicitudes from "./TableSolicitudes";
const { TabPane } = Tabs;

export default class TabsSolicitudesEmpresa extends React.Component{
    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        <TableSolicitudes ruta={'usersEmpresa'}/>
                    </TabPane>
                    <TabPane tab="Aprobados" key="2">
                        <TableSolicitudes ruta={'aprobadosEmpresa'}/>
                    </TabPane>
                    <TabPane tab="Pendientes" key="3">
                        <TableSolicitudes ruta={'pendientesEmpresa'}/>
                    </TabPane>
                    <TabPane tab="Rechazados" key="4">
                        <TableSolicitudes ruta={'rechazadosEmpresa'}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
