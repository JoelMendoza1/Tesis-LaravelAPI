import React from "react";
import { Tabs } from 'antd';
import TablaOfertar from "./TablaOfertar";
import TablaOfertarVisible from "./TablaOfertarVisible";
import TablaOfertarOculto from "./TablaOfertarOculto";
const { TabPane } = Tabs;
export default class TabsOfertar extends React.Component{

    render() {
        return(
            <div style={{margin:'0px'}}>
                <Tabs defaultActiveKey="1"  style={{margin:"auto"}}>
                    <TabPane tab="Todos" key="1">
                        <TablaOfertar/>
                    </TabPane>
                    <TabPane tab="Publicados" key="2">
                        <TablaOfertarVisible/>
                    </TabPane>
                    <TabPane tab="Ocultos" key="3">
                        <TablaOfertarOculto/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
