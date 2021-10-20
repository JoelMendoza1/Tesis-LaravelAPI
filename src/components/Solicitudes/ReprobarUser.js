import React, { useState}from "react";
import {Button, message, Input , Popconfirm} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";
export default function ReprobarUser(props){
    const [datos, setDatos] = useState({
        textArea: '',
    })
    const handleInputChange = (event) => {
        console.log(event.target.textArea)
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.textArea] : event.target.value
        })
    }
    const textPop=()=>{
        const { TextArea } = Input;
        return(
            <div>
                <h5>Escribe la razon de reprobación</h5>
                <TextArea showCount maxLength={100} onChange={handleInputChange}
                          rules={[{ required: true, message: 'Por favor ingresa la razón del rechazo' }]}/>
            </div>
        )
    }
    const confirm=async()=>{
        console.log(datos.undefined)
        if(datos.undefined===""){
            message.error('Razón de rechazo no especificada');
        }else{
            let url = API + 'users/'+props.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}` }
            };

            const data ={
                request: false,
                descriptionRequest: datos.undefined
            }
            axios.put(url,data, config).then(
                response=>{
                    message.success('Reprobado');
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
                okText="Reprobar"
                cancelText="Cancelar"
            >
                <Button shape="circle" style={{backgroundColor:"red"}} icon={<CloseOutlined />} title="Rechazar"/>
            </Popconfirm>
        </div>
        )

}
