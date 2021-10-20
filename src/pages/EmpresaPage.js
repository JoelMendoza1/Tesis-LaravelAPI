import React from "react";
import MiEmpresa from "../components/MiEmpresa/MiEmpresa";
import {ShopOutlined} from "@ant-design/icons";
import {Card} from "antd";
export default function EmpresaPage(){
    return(
        <div >
            <Card style={{paddingTop:'20px'}}>
                <h1 style={{alignContent:'center'}}><ShopOutlined /> My Empresa</h1>
            </Card>
            <MiEmpresa/>
        </div>
    )
}