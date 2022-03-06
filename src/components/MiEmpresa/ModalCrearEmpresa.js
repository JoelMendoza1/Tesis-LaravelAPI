import React from "react";
import {AutoComplete, Button, Form, Input, Modal, Select,message} from "antd";
import {Option} from "antd/es/mentions";
import axios from "axios";
import {API} from "../../services/API";
import {PlusOutlined} from "@ant-design/icons";
export default class ModalCrearEmpresa extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
                //usuarios: [],
                modal: false,
                selectedFile: null,
                nameFile: null,
                user_id: props.iduser,
            }
        )
    }
    fileSelectedHandler= event =>{
        console.log(event.target.files[0].name)
        this.setState({
            selectedFile: event.target.files[0],
            nameFile:event.target.files[0].name
        })
        message.success("Foto Cargada")
        message.info("Presione el boton subir foto")
    }
    okModal = async (userData) => {
        console.log(userData)
        const datos =new FormData();
        datos.append('RUC', userData.ruc);
        datos.append('nombreEmpresa', userData.razonSocial);
        datos.append('tipoEmpresa', userData.tipoEmpresa);
        datos.append('telefonoEmpresa', userData.telefono);
        datos.append('emailEmpresa', userData.email);
        datos.append('direccionEmpresa', userData.direccion);
        datos.append('image', this.state.selectedFile);

        console.log(this.props.iduser)
        let url = API + 'users/'+this.state.user_id+'/empresas';
        const token = localStorage.getItem('token')
        const t = token.replace(/['"]+/g, '')
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.post(url,datos,config).then(
            response => {
                message.success('Empresa creada');
                console.log(response.data)
                console.log(response.data.request)
                console.log(response.data.descriptionRequest)
                window.location.reload();
            }
        ).catch(e => {
            console.log(e.response.data)
            message.error('Error ' + e.response.data.message);
        })
    }
    apagarModal = () => {
        this.setState({
            modal: false
        })
    }
    encenderModal = () => {
        this.setState({
            modal: true
        })
    }
    render() {
        return (
            <div>
                <Button
                    style={{
                        backgroundColor:'#1E1E2F',
                        color:'#ffffff',
                        border:"#ffffff"
                    }}
                    type="primary"
                    onClick={this.encenderModal}
                >
                    <PlusOutlined/> Crear Empresa
                </Button>
                <Modal
                    title="Editar Perfil "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background: '#1E1E2F', color: '#ffffff', width:'26vh'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                >
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={this.okModal}
                        //onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name='imagenPerfil'
                            label='Imagen de perfil'
                        >
                            <input
                                type='file'
                                onChange={this.fileSelectedHandler}
                                ref={fileInput=>this.fileInput=fileInput}
                                accept="image/*"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Razón social"
                            name="razonSocial"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese su la Razón Socail de tú empresa!'},{
                                pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                message: 'Ingresar solo letras!',
                                type:'string',
                            }]}
                        >
                            <Input placeholder="Razón Social"/>
                        </Form.Item>
                        <Form.Item
                            label="RUC"
                            name="ruc"
                            rules={[{required: true, message: 'Por favor ingrese el RUC de su empresa!'},{
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
                            <Input placeholder="RUC"/>
                        </Form.Item>
                        <Form.Item
                            label="Tipo de empresa"
                            name="tipoEmpresa"
                            rules={[{required: true, message: 'Seleccione una de las opciones!'}]}
                        >
                            <Select style={{width: 120}}>
                                <Option value="Publica">Publica</Option>
                                <Option value="Privada">Privada</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Télefono"
                            name="telefono"
                            rules={[{required: true, message: 'Por favor ingrese su número de télefono!'},{
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
                            <Input placeholder="0900000000"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                whitespace:true,
                                message: 'Por favor ingrese un Email!' },
                                {
                                    message: 'Ingresar un email valido!',
                                    type:'email',
                                }]}
                        >
                            <AutoComplete
                                style={{width: '70%'}}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dirección"
                            name="direccion"
                            rules={[{required: true, message: 'Por favor ingrese su número de cédula!'}]}
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
                                Crear
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}