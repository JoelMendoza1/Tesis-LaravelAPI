import {Button, Form, Input, message, Modal, Slider} from "antd";
import {
    EditOutlined,
    TranslationOutlined,
    ControlOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";

export default class EditarIdioma extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            idioma: [],
            id:props.id,

        })
    }
    getIdioma= async (id)=>{
        let url = API + 'idiomas/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{

                this.setState({
                    idioma:[response.data],
                    id: response.data.id
                })
            }
        )
    }
    componentDidMount() {
        //this.getIdioma(this.state.id)
    }
    okModal=async (userData)=>{
        try{
            const datos=({
                idioma: userData.idioma,
                nivel:userData.nivel,
            })
            console.log(datos)
            let url = API +'idiomas/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.put(url,datos, config).then(
                response=>{
                    message.success('Idioma actualizado!!');
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
        this.getIdioma(this.state.id)
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title='Editar Idioma' onClick={this.encenderModal}/>
                <Modal
                    title="Editar Idioma "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                    {this.state.idioma.map((value)=>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                idioma: value.idioma,
                                nivel: value.nivel,
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
