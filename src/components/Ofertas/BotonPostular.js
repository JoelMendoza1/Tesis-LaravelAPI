import React from "react";
import {Button, message, Popconfirm} from "antd";
import {API} from "../../services/API";
import axios from "axios";
export default function BotonPostular(props){
    const confirm=async()=>{
        let url = API + 'users/'+props.iduser+'/postulacion';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        const datos = {
            //estadoPostulacion: false,
            descripcion: "Postulación en proceso",
            oferta_id: props.idoferta
        }
        console.log(url, config, props.iduser,props.idoferta, datos)

        axios.post(url,datos, config).then(
            response=>{
                message.success('Postulado');
                console.log(response.data)
                //window.location.reload();
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
                title='Postular'
                onConfirm={confirm}
                onCancel={cancel}
                okText="Postular"
                cancelText="Cancelar"
            >
                <Button  type="primary" danger>Postular</Button>
            </Popconfirm>
        </div>
    )
}