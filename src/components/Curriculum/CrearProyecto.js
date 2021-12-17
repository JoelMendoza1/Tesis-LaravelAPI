import {Button, Form, Input, message, Modal} from "antd";
import {
    PlusOutlined,
    BarsOutlined,
    FileTextOutlined,
    ShareAltOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class CrearProyecto extends React.Component{
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
                proyecto: userData.proyecto,
                link:userData.link,
                description: userData.description,
            })
            console.log(datos)
            let url = API +'users/'+this.state.id+'/proyectos';
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.post(url,datos, config).then(
                response=>{
                    message.success('Nuevo proyecto  ingresado!!');
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
                    title='Crear Proyecto'
                    onClick={this.encenderModal}
                />
                <Modal
                    title="Crear Proyecto "
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
                            label={<><BarsOutlined/> Nombre del proyecto</>}
                            name="proyecto"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese nombre del proyecto' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<><ShareAltOutlined/> Link</>}
                            name="link"
                            rules={[{ required: true,whitespace:true, message: 'Por favor ingrese un link donde se aloje la documentación o el proyecto' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<><FileTextOutlined/> Descripcion</>}
                            name="description"
                            rules={[{whitespace:true, message: 'Ingrese una descripcion sobre el proyecto' }]}
                        >
                            <Input.TextArea />
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