import React from "react";
import {Button, message} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";

export default function AprobarPostulacion(props){
    const onClickAprobar=async(e)=>{
        console.log(props.id)
        let url = API + 'postulacions/'+props.id;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        const data ={
            estadoPostulacion: true,
            descripcion: 'Aceptado'
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
    return(
        <div>
            <Button shape="circle" style={{backgroundColor:'green'}} icon={<CheckOutlined />} title="Aprobar"  onClick={onClickAprobar}/>
        </div>
    )
}