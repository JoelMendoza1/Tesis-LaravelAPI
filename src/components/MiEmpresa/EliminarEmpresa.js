import React from "react";
import {Button, message, Popconfirm} from "antd";
import {API} from "../../services/API";
import axios from "axios";
import {DeleteOutlined} from "@ant-design/icons";
export default function EliminarEmpresa(props){
    const confirm=async()=>{
        let url = API + 'empresas/'+props.idempresa;

            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
        console.log(url, config)

            axios.delete(url, config).then(
                response=>{
                    message.success('Eliminado');
                    console.log(response.data)
                    console.log(response.data.request)
                    console.log(response.data.descriptionRequest)
                    window.location.reload();


                }
            ).catch(e=>{
                console.log(e)
                message.error('Error '+e);
            })
    }
    function cancel(e) {
        console.log(e);
        message.error('Cancelado');
    }
    const textPop=()=>{
        return(
            <div>
                <h5>Esta seguro de eliminar esta empresa?</h5>
            </div>
        )
    }
    return(
        <div>
            <Popconfirm
                title={textPop}
                onConfirm={confirm}
                onCancel={cancel}
                okText="Eliminar"
                cancelText="Cancelar"
            >
                <Button type="primary" danger title="Eliminar"><DeleteOutlined/>Eliminar</Button>
            </Popconfirm>
        </div>
    )
}