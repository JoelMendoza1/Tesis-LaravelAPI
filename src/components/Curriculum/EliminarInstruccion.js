import React from "react";
import {Button, message, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";

export default function EliminarInstruccion(props){
    const confirm=async()=>{
        let url = API + 'instrucciones/'+props.id;
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
    return(
        <div>
            <Popconfirm
                title="  Estas seguro de eliminar esta instruccion?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Eliminar"
                cancelText="Cancelar"
            >
                <Button type="danger" shape="circle" icon={<DeleteOutlined />} title='Eliminar Instruccion'/>
            </Popconfirm>
        </div>
    )
}