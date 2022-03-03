import React from "react";
import {AutoComplete, Button, Form, Input, Modal, Select,message} from "antd";
import { FormOutlined,} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import axios from "axios";
import {API} from "../../services/API";

export default class ModalEditEmpresa extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
                //usuarios: [],
                empresa:[],
                modal: false,
                fileList: [],
                imageUrl: null,
                user_id: props.iduser,
                empresa_id: props.idempresa
            }
        )
    }
    componentDidMount(){

    }
    getEmpresa=async(id)=>{
        console.log(id)
        let url = API + 'empresas/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    empresa:[response.data]
                })
            }
        ).catch(
            e=>{
                console.log(this.state.empresa)
                console.log(e.message)
                message.error("Empresa no encontrada!")
            }
        )
    }
    okModal=async (userData)=>{
        console.log(userData)
        const datos ={
            RUC: userData.ruc,
            nombreEmpresa: userData.razonSocial,
            tipoEmpresa: userData.tipoEmpresa,
            telefonoEmpresa: userData.telefono,
            emailEmpresa:userData.email,
            direccionEmpresa: userData.direccion,
        }
        console.log(datos)
        console.log(this.state.user_id)
        console.log(this.state.empresa_id)
        let url = API +'empresas/'+this.state.empresa_id;
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
            console.log(e.response)
            message.error('Error '+e);
        })
    }

    apagarModal=()=>{
        this.setState({
            modal: false
        })
    }
    encenderModal=()=>{
        this.getEmpresa(this.state.empresa_id)
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button  style={{backgroundColor:'#1E1E2F', color:'#ffffff', border:"#ffffff", marginTop:'20px', width:'20vh'}}
                         onClick={this.encenderModal}
                >
                    <FormOutlined /> Editar Empresa
                </Button>
                <Modal
                    title="Editar Perfil "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                >
                    {this.state.empresa.map((value, index) => (
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            razonSocial: value.nombreEmpresa,
                            ruc:value.RUC,
                            tipoEmpresa:value.tipoEmpresa,
                            telefono:value.telefonoEmpresa,
                            email:value.emailEmpresa,
                            direccion:value.direccionEmpresa,

                    }}
                        onFinish={this.okModal}
                        //onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Razón social"
                            name="razonSocial"
                            rules={[{ required: true, message: 'Por favor ingrese su la Razón Socail de tú empresa!' }]}
                        >
                            <Input placeholder="Razón Social"/>
                        </Form.Item>
                        <Form.Item
                            label="RUC"
                            name="ruc"
                            rules={[{ required: true, message: 'Por favor ingrese el RUC de su empresa!' }]}
                        >
                            <Input placeholder="RUC"/>
                        </Form.Item>
                        <Form.Item
                            label="Tipo de empresa"
                            name="tipoEmpresa"
                            rules={[{ required: true, message: 'Seleccione una de las opciones!' }]}
                        >
                            <Select  style={{ width: 120 }}>
                                <Option value="Publica">Publica</Option>
                                <Option value="Privada">Privada</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Télefono"
                            name="telefono"
                            rules={[{ required: true, message: 'Por favor ingrese su número de télefono!' }]}
                        >
                            <Input placeholder="0900000000"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Por favor ingrese un Email!' }]}
                        >
                            <AutoComplete
                                style={{ width: '70%' }}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dirección"
                            name="direccion"
                            rules={[{ required: true, message: 'Por favor ingrese su número de cédula!' }]}
                        >
                            <Input placeholder="Dirección"/>
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
                    ))
                    }
                </Modal>
            </div>
        )
    }
}