import React from "react";
import { Tabs } from 'antd';
import TablaOfertar from "./TablaOfertar";
const { TabPane } = Tabs;
export default class TabsOfertar extends React.Component{

    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        <TablaOfertar rutaEmpresa='empresas/' rutaOferta='/ofertas'/>
                    </TabPane>
                    <TabPane tab="Publicados" key="2">
                        <TablaOfertar rutaEmpresa='empresas/' rutaOferta='/visibles'/>

                    </TabPane>
                    <TabPane tab="Ocultos" key="3">
                        <TablaOfertar rutaEmpresa='empresas/' rutaOferta='/ocultos'/>

                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
