import {AutoComplete, Button, DatePicker, Form, Input, message, Modal} from "antd";
import {FormOutlined} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import moment from 'moment';

export default class ModalEditUser extends React.Component{
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
        const datos=({
            name: userData.nombre,
            lastname:userData.apellido,
            email: userData.email,
            identificationCard: userData.cedula,
            telephoneNumber: userData.telefono,
            address: userData.direccion,
            dateOfBirth: userData['fechaNacimiento'].format('DD/MM/YYYY'),
            institution: userData.institucion
        })
        console.log(datos)
        let url = API +'users/'+this.state.id;
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
        this.getUser()
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button  style={{backgroundColor:'#1E1E2F', color:'#ffffff', border:"#ffffff"}}
                         onClick={this.encenderModal}
                >
                    <FormOutlined className='botonDash' style={{ fontSize:'10px' }}/> Editar Perfil
                </Button>

                <Modal
                    title="Editar Perfil "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                    {this.state.usuario.map((value) => (
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                'nombre': value.name,
                                'apellido': value.lastname,
                                'email':value.email,
                                'cedula':value.identificationCard,
                                'telefono':value.telephoneNumber,
                                'direccion':value.address,
                                'fechaNacimiento': moment(value.dateOfBirth, 'DD/MM/YYYY'),
                                'institucion':value.institution
                            }}
                        >
                            <Form.Item
                                label="Nombre"
                                name="nombre"
                                rules={[{whitespace:true, message: 'Por favor ingrese su nombre!' }]}
                            >
                                <Input placeholder="Nombre" />
                            </Form.Item>
                            <Form.Item
                                label="Apellido"
                                name="apellido"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese su apellido!' }]}
                            >
                                <Input placeholder="Apellido" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese un Email!' }]}
                            >
                                <AutoComplete
                                    style={{ width: '70%' }}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Número de Cédula"
                                name="cedula"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese su número de cédula!' }]}
                            >
                                <Input placeholder="1700000000"/>
                            </Form.Item>
                            <Form.Item
                                label="Télefono"
                                name="telefono"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese su número de télefono!' }]}
                            >
                                <Input placeholder="0900000000" />
                            </Form.Item>
                            <Form.Item
                                label="Dirección"
                                name="direccion"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese su dirección!' }]}
                            >
                                <Input placeholder="Dirección"/>
                            </Form.Item>
                            <Form.Item
                                label="Fecha de Nacimiento"
                                name="fechaNacimiento"
                                rules={[{ type: 'object', required: true,whitespace:true, message: 'Por favor ingrese su fecha de nacimiento!' }]}
                            >
                                <DatePicker format={'DD/MM/YYYY'}/>
                            </Form.Item>
                            <Form.Item
                                label="Institución"
                                name="institucion"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese la instituciondonde pertenese!' }]}
                            >
                                <Input placeholder="Institucion"/>
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
                    ))}
                </Modal>
            </div>
        )
    }
}
