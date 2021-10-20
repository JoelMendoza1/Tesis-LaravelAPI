import {AutoComplete, Button, DatePicker, Form, Input, Modal, Select} from "antd";
import {FormOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Option} from "antd/es/mentions";

export default function ModalEditUser(){
    const [user, setUser]=useState({
        //usuarios: [],
        // link:[],
        modal: false,
        loading: false,
    })
    const okModal=async (userData)=>{
        console.log(userData)
        /*const datos=({
            image: FormData.fotoPerfil,
            name: FormData.nombre
        })
        console.log(datos)*/
    }
    const apagarModal=()=>{
        setUser({
            modal: false
        })
    }
    const encenderModal=()=>{
        setUser({
            modal: true
        })
    }
        return(
            <div>
                <Button  style={{backgroundColor:'#1E1E2F', color:'#ffffff', border:"#ffffff"}}
                         onClick={encenderModal}
                >
                    <FormOutlined className='botonDash' style={{ fontSize:'10px' }}/> Editar Perfil
                </Button>

                <Modal
                    title="Editar Perfil "
                    visible={user.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={okModal}>
                            Editar
                        </Button>,
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={apagarModal} >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={okModal}
                        //onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Foto de perfil"
                            name="fotoPerfil"
                            rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                        >
                            <input type='file'/>
                        </Form.Item>
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                        >
                            <Input placeholder="Nombre"/>
                        </Form.Item>
                        <Form.Item
                            label="Apellido"
                            name="apellido"
                            rules={[{ required: true, message: 'Por favor ingrese su apellido!' }]}
                        >
                            <Input placeholder="Apellido"/>
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
                            label="Número de Cédula"
                            name="cedula"
                            rules={[{ required: true, message: 'Por favor ingrese su número de cédula!' }]}
                        >
                            <Input placeholder="1700000000"/>
                        </Form.Item>
                        <Form.Item
                            label="Télefono"
                            name="telefono"
                            rules={[{ required: true, message: 'Por favor ingrese su número de télefono!' }]}
                        >
                            <Input placeholder="0900000000"/>
                        </Form.Item>
                        <Form.Item
                            label="Dirección"
                            name="direcion"
                            rules={[{ required: true, message: 'Por favor ingrese su dirección!' }]}
                        >
                            <Input placeholder="Dirección"/>
                        </Form.Item>
                        <Form.Item
                            label="Fecha de Nacimiento"
                            name="fechaNacimiento"
                            rules={[{ required: true, message: 'Por favor ingrese su fecha de nacimiento!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="Institución"
                            name="institucion"
                            rules={[{ required: true, message: 'Por favor ingrese la instituciondonde pertenese!' }]}
                        >
                            <Select defaultValue="Option1" mode="tags">
                                <Option value="Option1">Escuela Politecnica Nacional</Option>
                            </Select>
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
                </Modal>
            </div>
        )

}
