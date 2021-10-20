import React from "react";
import {AutoComplete, Button, Form, Input, Modal, Select,message} from "antd";
import {Option} from "antd/es/mentions";
import axios from "axios";
import {API} from "../../services/API";
export default class ModalCrearEmpresa extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
                //usuarios: [],
                modal: false,
                fileList: [],
                imageUrl: null,
                user_id: props.iduser,
            }
        )
    }
    componentDidMount() {

    }
    okModal = async (userData) => {
        console.log(userData)
        const datos = {
            RUC: userData.ruc,
            nombreEmpresa: userData.razonSocial,
            tipoEmpresa: userData.tipoEmpresa,
            telefonoEmpresa: userData.telefono,
            emailEmpresa: userData.email,
            direccionEmpresa: userData.direccion,
            imagen: userData.imagenPerfil
        }
        console.log(datos)
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
            console.log(e.response.data.message)
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
                <Button type="primary" shape="round" onClick={this.encenderModal}>Crear Empresa</Button>
                <Modal
                    title="Editar Perfil "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background: '#1E1E2F', color: '#ffffff'}} onClick={this.apagarModal}>
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
                            rules={ [
                                {
                                    required: true,
                                    message: 'Sube tu foto'
                                }
                            ] }
                        >
                            <input type='file'/>
                        </Form.Item>
                        <Form.Item
                            label="Razón social"
                            name="razonSocial"
                            rules={[{required: true, message: 'Por favor ingrese su la Razón Socail de tú empresa!'}]}
                        >
                            <Input placeholder="Razón Social"/>
                        </Form.Item>
                        <Form.Item
                            label="RUC"
                            name="ruc"
                            rules={[{required: true, message: 'Por favor ingrese el RUC de su empresa!'}]}
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
                            rules={[{required: true, message: 'Por favor ingrese su número de télefono!'}]}
                        >
                            <Input placeholder="0900000000"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Por favor ingrese un Email!'}]}
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