import React, {useState, useEffect}from "react";
import {Card, message, Select, Checkbox} from 'antd';
import {API} from "../../services/API";
import { Form, Input, Button,TimePicker, InputNumber} from 'antd';
import {HistoryOutlined } from '@ant-design/icons';
import axios from "axios";
import {Option} from "antd/es/mentions";

const { RangePicker } = TimePicker;
export default function Ofertar() {
    const [idEmpresa, setIdEmpresa] = useState({})
    const getUser= async ()=>{
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                message.success("Usuario encontrado! "+ response.data.id)
                getEmpresa(response.data.id)
            }
        )
    }
    const getEmpresa= (id)=>{
        console.log(id)
        let url = API + 'users/'+id+'/empresas';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response.data.id)
                setIdEmpresa({
                    idEmpresa: response.data.id
                })
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Empresa no encontrada!")
            }
        )
    }
    useEffect(() => {
        getUser();
    }, []);
    const onFinish = async (userData) => {
        getUser();
        const idempresa = idEmpresa.idEmpresa
        let urlAPI = API + 'empresas/'+idempresa+'/ofertas';
        const token = localStorage.getItem('token')
        const t = token.replace(/['"]+/g, '')
        const fecha = new Date();
        const horario1 = userData.horario[0]._d+"";
        const horario2 = userData.horario[1]._d+"";
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        const data={
                oferta: userData.oferta,
                descripcionOferta: userData.descripcionOferta,
                horario: horario1.substring(16,horario1.length -30 )+" a "+horario2.substring(16, horario1.length -30 ),
                numberoPostulantes: userData.numberoPostulantes,
                direcionOferta: userData.direcionOferta,
                carreraOferta: userData.carreraOferta,
                visible: userData.visible,
                fechaOferta: fecha+""
            }
            axios.post(urlAPI,data,config).then(
                response => {
                    message.success('Oferta creada');
                    console.log(response.data)
                    console.log(response.data.request)
                    console.log(response.data.descriptionRequest)
                    window.location.reload();
                }
            ).catch(e => {
                console.log(e.message)
                message.error('Error ' + e.message);
            })
            console.log(data)
            console.log(idempresa)
    };
    return (
        <div>
                <Card
                    style={{
                        width: '700px',
                        alignContent: 'center',
                        margin: 'auto',
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        style={{
                            width: '700px'
                        }}
                    >
                        <h1 align='center' style={{padding:'40px'}}>Formulario de Orfertas</h1>
                        <Form.Item
                            label={<label> Oferta</label>}
                            name="oferta"
                            rules={[{required: true, message: 'Por favor ingresale un titulo a tu oferta!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Descripción</label>}
                            name="descripcionOferta"
                            rules={[{required: true, message: 'Por favor ingresa una descripción!'}]}
                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item
                            label={<label><HistoryOutlined /> Horario</label>}
                            name="horario"
                        >
                            <RangePicker bordered={false} format='HH:mm' disabledSeconds/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Número de postulantes</label>}
                            name="numberoPostulantes"
                            rules={[{required: true, message: 'Por favor ingresa el número de postulantes que deseas!'}]}
                        >
                            <InputNumber min={1} max={100}/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Dirección</label>}
                            name="direcionOferta"
                            rules={[{required: true, message: 'Por favor ingresa una dirección!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Carrera</label>}
                            name="carreraOferta"
                            rules={[{required: true, message: 'Por favor ingresa una carrera!'}]}
                        >
                            <Select>
                                <Option value="Tecnología Superior en Agua y Saneamiento Ambiental - TSASA">
                                    Tecnología Superior en Agua y Saneamiento Ambiental - TSASA
                                </Option>
                                <Option value="Tecnología Superior en Electromecánica -TSEM">
                                    Tecnología Superior en Electromecánica -TSEM
                                </Option>
                                <Option value="Tecnología Superior en Redes y Telecomunicaciones - TSRT">
                                    Tecnología Superior en Redes y Telecomunicaciones - TSRT
                                </Option>
                                <Option value="Tecnología Superior en Desarrollo de Software -TSDS">
                                    Tecnología Superior en Desarrollo de Software -TSDS
                                </Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<label> Publicar</label>}
                            name="visible"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" style={{
                                backgroundColor: '#1E1E2F',
                                color: '#ffffff',
                                marginTop: '30px',
                                border: "#ffffff"
                            }}>
                                Publicar Oferta
                            </Button>
                        </Form.Item>


                    </Form>
                </Card>
        </div>
    )
}