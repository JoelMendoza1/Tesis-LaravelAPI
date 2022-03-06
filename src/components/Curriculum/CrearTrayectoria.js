import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import {
    BankOutlined,
    PlusOutlined,
    DesktopOutlined,
    AuditOutlined,
    CalendarOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class CrearTrayectoria extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuario: [],
            id:0
        })
    }
    getUser= async ()=>{
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                this.setState({
                    usuario:[response.data],
                    id: response.data.id
                })
            }
        )
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
            let url = API +'users/'+this.state.id+'/trayectoriaslaborales';
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.post(url,datos, config).then(
                response=>{
                    message.success('Nueva trayectoria laboral  ingresada!!');
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
        this.getUser()
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button
                    style={{
                        background:'#237804',
                        borderColor:'transparent'
                    }}
                    type="primary"
                    icon={<PlusOutlined />}
                    shape="circle"
                    title='Crear'
                    onClick={this.encenderModal}
                />
                <Modal
                    title="Crear Trayectoria "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                remember: true
                            }}
                        >
                            <Form.Item
                                label={<><BankOutlined/> Empresa</>}
                                name="empresa"
                                rules={[{required: true,whitespace:true, message: 'Por favor ingrese una empresa' },{
                                    pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                    message: 'Ingresar solo letras!',
                                    type:'string',
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><DesktopOutlined/> Puesto de trabajo</>}
                                name="puestoTrabajo"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese el puesto de trabajo' },{
                                    pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                    message: 'Ingresar solo letras!',
                                    type:'string',
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><AuditOutlined/> Responsabilidades</>}
                                name="responsabilidades"
                                rules={[{ required: true,whitespace:true, message: 'Ingrese las responsabilidades ejercidas!' },{
                                    pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                    message: 'Ingresar solo letras!',
                                    type:'string',
                                }]}
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
                                rules={[{
                                    required: true,
                                    message: 'Télefono requerido!',
                                },{
                                    whitespace:true,
                                    message: 'Ha ingresado espacios en blanco!',
                                },{
                                    max:10,
                                    message: 'Maximo 10 caracteres!!',
                                },{
                                    min:10,
                                    message: 'Minimo 10 caracteres!!!',
                                },{
                                    pattern: /^[0-9]+$/,
                                    message: 'Ingresar solo numeros!',
                                    type:'string',
                                }]}
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
                                    Crear
                                </Button>
                            </Form.Item>
                        </Form>
                </Modal>
            </div>
        )
    }
}
