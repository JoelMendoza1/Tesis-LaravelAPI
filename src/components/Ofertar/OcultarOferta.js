import React from "react";
import {Button, message} from "antd";
import {EyeInvisibleFilled} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";

export default function OcultarOferta(props){
    const onClickAprobar=async(e)=>{
        console.log(props.id)
        let url = API + 'ofertas/'+props.id;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        const data ={
            visible: false,
        }
        axios.put(url,data, config).then(
            response=>{
                message.success('Oferta oculta');
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
            <Button
                type="primary"
                style={{background:"#292F36", borderColor: "transparent"}}
                shape="circle"
                icon={<EyeInvisibleFilled />}
                title="Ocultar"
                onClick={onClickAprobar}
            />
        </div>
    )
}
