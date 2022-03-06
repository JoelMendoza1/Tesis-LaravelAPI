import React from "react";
import {Card, Button, Form, Input, Modal, Select, message, InputNumber, Checkbox, TimePicker} from "antd";
import {EditOutlined, HistoryOutlined,} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import axios from "axios";
import {API} from "../../services/API";
import moment from 'moment';

const { RangePicker } = TimePicker;
export default class EditarOfertas extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
                modal: false,
                ofertas:[],
                id:props.id
            }
        )
    }
    componentDidMount(id){
        this.getOferta(id)
    }
    getOferta (id) {
        let url = API + 'ofertas/'+id;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    ofertas: [response.data],
                })
                console.log(this.state.ofertas)
            }
        )
    }
    okModal=async (userData,id)=>{
        console.log(userData)
        const horario1 = userData.horario[0]._d+"";
        const horario2 = userData.horario[1]._d+"";
        const datos ={
            oferta: userData.oferta,
            descripcionOferta: userData.descripcionOferta,
            horario: horario1.substring(16,horario1.length -30 )+" a "+horario2.substring(16, horario1.length -30 ),
            numberoPostulantes: userData.numberoPostulantes,
            direcionOferta: userData.direcionOferta,
            carreraOferta: userData.carreraOferta,
            visible: userData.visible,
        }
        console.log(datos)
        console.log(this.state.user_id)
        console.log(this.state.empresa_id)
        let url = API + 'ofertas/'+this.state.id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.put(url,datos, config).then(
            response=>{
                message.success('Actualizado');
                console.log(response.data)
                console.log(response.data.request)
                console.log(response.data.descriptionRequest)
                window.location.reload();
            }
        ).catch(e=>{
            console.log(e.message)
            message.error('Error '+e);
        })
    }
    apagarModal=()=>{
        this.setState({
            modal: false
        })
    }
    encenderModal=()=>{
        this.setState({
            modal: true
        })
        this.componentDidMount(this.props.id)
    }
    render() {
        return(
            <div>
                <Button type="primary"   shape="circle" icon={<EditOutlined />} title="Editar Oferta" onClick={this.encenderModal}/>
                <Modal
                    title="Editar Oferta "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                    width={700}
                >
                    <Card>
                    {this.state.ofertas.map((value, index) =>
                    <Form
                        name="basic"
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        initialValues={{remember: true}}
                        onFinish={this.okModal}
                        style={{
                            width: '700px'
                        }}
                        key={index}
                    >
                        <h1 align='center' style={{padding:'40px'}}>Formulario de Orfertas</h1>
                        <Form.Item
                            label={<label> Oferta</label>}
                            name="oferta"
                        >
                            <Input defaultValue={value.oferta}/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Descripción</label>}
                            name="descripcionOferta"
                        >
                            <Input.TextArea defaultValue={value.descripcionOferta}/>
                        </Form.Item>
                        <Form.Item
                            label={<label><HistoryOutlined /> Horario laboral</label>}
                            name="horario"
                            rules={[{required: true, message: 'Por favor ingresa el horario de trabajo que solicitas!'}]}
                        >
                            <RangePicker bordered={false} format='HH:mm' defaultValue={moment(value.horario, 'HH:mm')}/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Número de postulantes</label>}
                            name="numberoPostulantes"
                        >
                            <InputNumber min={1} max={100} defaultValue={value.numberoPostulantes}/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Dirección</label>}
                            name="direcionOferta"
                        >
                            <Input defaultValue={value.direcionOferta}/>
                        </Form.Item>
                        <Form.Item
                            label={<label> Carrera</label>}
                            name="carreraOferta"
                        >
                            <Select defaultValue={value.carreraOferta}>
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
                        >
                            <Checkbox  defaultChecked={value.visible} />
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
                    )}
                    </Card>
                </Modal>
            </div>
        )
    }
}