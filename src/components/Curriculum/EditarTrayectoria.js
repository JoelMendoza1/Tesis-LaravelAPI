import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import {
    BankOutlined,
    DesktopOutlined,
    AuditOutlined,
    CalendarOutlined,
    PhoneOutlined, EditOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import moment from 'moment';

export default class EditarTrayectoria extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            trayectoria: [],
            id:props.id,

        })
    }
    getTrayectoria= async (id)=>{
        let url = API + 'trayectoriaslaborales/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                this.setState({
                    trayectoria:[response.data],
                    id: response.data.id
                })
            }
        )
    }
    componentDidMount() {
        this.getTrayectoria(this.state.id)
    }

    okModal=async (userData)=>{
        try{
            const datos=({
                empresa: userData.empresa,
                puestoTrabajo:userData.puestoTrabajo,
                responsabilidades: userData.responsabilidades,
                fechaInicio: userData.periodoTrabajo[0].format('DD/MM/YYYY'),
                fechaSalida: userData.periodoTrabajo[1].format('DD/MM/YYYY'),
                contacto: userData.contacto
            })
            console.log(datos)
            let url = API +'trayectoriaslaborales/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.put(url,datos, config).then(
                response=>{
                    message.success('Trayectoria actualizada!!');
                    console.log(response.data)
                    window.location.reload();
                }
            ).catch(e=>{
                //console.log(e.response.data)
                console.log(e)
                message.error(e.response.data.message);
            })
        }catch (e){
            message.error( <>{ e.message }</> );
            console.log(e.message)
        }

    }
    apagarModal=()=>{
        this.setState({
            modal: false
        })
    }
    encenderModal=()=>{
        this.getTrayectoria()
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title='Editar' onClick={this.encenderModal}/>
                <Modal
                    title="Editar Trayectoria "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                    {this.state.trayectoria.map((value)=>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                remember: true,
                                empresa: value.empresa,
                                puestoTrabajo: value.puestoTrabajo,
                                responsabilidades: value.responsabilidades,
                                //periodoTrabajo:[moment(value.fechaInicio, 'DD/MM/YYYY'),moment(value.fechaSalida, 'DD/MM/YYYY')],
                                periodoTrabajo:[moment(value.fechaInicio, 'DD/MM/YYYY'), moment(value.fechaSalida, 'DD/MM/YYYY')],
                                contacto: value.contacto
                            }}
                        >
                            <Form.Item
                                label={<><BankOutlined/> Empresa</>}
                                name="empresa"
                                rules={[{required: true,whitespace:true, message: 'Por favor ingrese una empresa' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><DesktopOutlined/> Puesto de trabajo</>}
                                name="puestoTrabajo"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese el puesto de trabajo' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><AuditOutlined/> Responsabilidades</>}
                                name="responsabilidades"
                                rules={[{ required: true,whitespace:true, message: 'Ingrese las responsabilidades ejercidas!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><CalendarOutlined/> Fecha de ingreso</>}
                                name="periodoTrabajo"
                                //rules={[{whitespace:true, message: 'Ingrese el periodo de trabajo' }]}
                            >
                                <DatePicker.RangePicker format={'DD/MM/YYYY'}/>
                            </Form.Item>
                            <Form.Item
                                label={<><PhoneOutlined/> Contacto</>}
                                name="contacto"
                                rules={[{ required: true,whitespace:true, message: 'Ingrese el contacto telefonico de la empresa' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit" style={{
                                    backgroundColor: '#1E1E2F',
                                    color: '#ffffff',
                                    marginTop: '30px',
                                    border: "#ffffff"
                                }}>
                                    Editar
                                </Button>
                            </Form.Item>
                        </Form>
                    )}

                </Modal>
            </div>
        )
    }
}
