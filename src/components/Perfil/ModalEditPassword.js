import {Button, Checkbox, Form, Input, message, Modal} from "antd";
import {KeyOutlined} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class ModalEditPassword extends React.Component{
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
                oldpassword: userData.oldpassword,
                password:userData.password,
                password_confirmation: userData.password_confirmation,
            })
            console.log(datos)
            let url = API +'usersPasword/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.put(url,datos, config).then(
                response=>{
                    message.success('Contraseña actualizada');
                    console.log(response.data)
                    window.location.reload();
                }
            ).catch(e=>{
                console.log(e.response.data.message)
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
                <Button  style={{backgroundColor:'#1E1E2F', color:'#ffffff', border:"#ffffff", marginTop:'15px', width:'26vh'}}
                         onClick={this.encenderModal}
                >
                    <KeyOutlined className='botonDash' style={{ fontSize:'10px' }}/> Cambiar contraseña
                </Button>
                <Modal
                    title="Cambiar contraseña "
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
                                remember: true
                            }}
                        >
                            <Form.Item
                                label="Contraseña"
                                name="oldpassword"
                                rules={[{required: true,whitespace:true, message: 'Por favor ingrese su actual contraseña' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Nueva contraseña"
                                name="password"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese una nueva contraseña!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirmar nueva contraseña"
                                name="password_confirmation"
                                rules={[{ required: true,whitespace:true, message: 'Confirme la nueva contraseña!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox >Recordar contraseña</Checkbox>
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
