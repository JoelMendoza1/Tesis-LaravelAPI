import {Button, Form, Input, message, Modal, Slider} from "antd";
import {
    EditOutlined,
    ControlOutlined, ToolOutlined, FileTextOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class EditarHabilidad extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            habilidad: [],
            id:props.id,

        })
    }
    getHabilidad= async (id)=>{
        let url = API + 'habilidades/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{

                this.setState({
                    habilidad:[response.data],
                    id: response.data.id
                })
            }
        )
    }
    componentDidMount() {
    }
    okModal=async (userData)=>{
        try{
            const datos=({
                habilidad: userData.habilidad,
                dominio:userData.dominio,
                descripcion: userData.descripcion
            })
            console.log(datos)
            let url = API +'habilidades/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.put(url,datos, config).then(
                response=>{
                    message.success('Habilidad actualizada!!');
                    console.log(response.data)
                    window.location.reload();
                }
            ).catch(e=>{
                //console.log(e.response.data)
                console.log(e)
                message.error(e.response.data);
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
        this.getHabilidad(this.state.id)
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title='Editar Habilidad' onClick={this.encenderModal}/>
                <Modal
                    title="Editar Habilidad "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                    {this.state.habilidad.map((value)=>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                habilidad: value.habilidad,
                                dominio:value.dominio,
                                descripcion: value.descripcion
                            }}
                        >
                            <Form.Item
                                label={<><ToolOutlined/> Nombre de la habilidad</>}
                                name="habilidad"
                                rules={[{required: true,whitespace:true, message: 'Por favor ingrese un idioma' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><ControlOutlined/> Dominio</>}
                                name="dominio"
                                //rules={[{ required: true,whitespace:true, message: 'Por favor ingrese un nivel de dominio' }]}
                            >
                                <Slider
                                    min={1}
                                    max={100}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<><FileTextOutlined/> Descripcion</>}
                                name="descripcion"
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
