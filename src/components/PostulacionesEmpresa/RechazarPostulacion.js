import React from "react";
import {Button, message, Popconfirm} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";
export default function RechazarPostulacion(props){
    const textPop=()=>{
        return(
            <div>
                <h5>Escribe la razon de reprobación</h5>
            </div>
        )
    }
    const confirm=async()=>{
        console.log(props.id)
        let url = API + 'postulacions/'+props.id;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        const data ={
            estadoPostulacion: false,
            descripcion: 'Rechazado'
        }
        axios.put(url,data, config).then(
            response=>{
                message.success('Aprobado');
                console.log(response.data)
                console.log(response.data.request)
                console.log(response.data.descriptionRequest)
                window.location.reload();
            }
        ).catch(e=>{
            console.log(e)
        })
    }

    function cancel(e) {
        console.log(e);
        message.error('Cancelado');
    }
    return(
        <div>
            <Popconfirm
                title={textPop}
                onConfirm={confirm}
                onCancel={cancel}
                okText="Rechazar"
                cancelText="Cancelar"
            >
                <Button shape="circle" style={{backgroundColor:"red"}} icon={<CloseOutlined />} title="Rechazar"/>
            </Popconfirm>
        </div>
    )

}