import {Button, Form, Input, message, Modal, Slider} from "antd";
import {
    PlusOutlined,
    TranslationOutlined,
    ControlOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class CrearIdioma extends React.Component{
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
                idioma: userData.idioma,
                nivel:userData.nivel,
            })
            console.log(datos)
            let url = API +'users/'+this.state.id+'/idiomas';
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.post(url,datos, config).then(
                response=>{
                    message.success('Nuevo idioma  ingresado!!');
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
                    title='Crear Idioma'
                    onClick={this.encenderModal}
                />
                <Modal
                    title="Crear Idioma "
                    visible={this.state.modal}
                    width={600}
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
                            label={<><TranslationOutlined/> Nombre del idioma</>}
                            name="idioma"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese un idioma' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<><ControlOutlined/> Dominio</>}
                            name="nivel"
                            //rules={[{ required: true,whitespace:true, message: 'Por favor ingrese un nivel de dominio' }]}
                        >
                            <Slider
                                min={1}
                                max={100}
                            />
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