import {Button, Form, Input, message, Modal, Select} from "antd";
import {
    EditOutlined, BookOutlined, StockOutlined, BankOutlined, CrownOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
const { Option } = Select;
export default class EditarInstruccion extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            instruccion: [],
            id:props.id,

        })
    }
    getInstrucciones= async (id)=>{
        let url = API + 'instrucciones/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{

                this.setState({
                    instruccion:[response.data],
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
                instruccion: userData.instruccion,
                nivelInstrucion: userData.nivelInstrucion,
                institucion: userData.institucion,
                especializacion: userData.especializacion,
            })
            console.log(datos)
            let url = API +'instrucciones/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.put(url,datos, config).then(
                response=>{
                    message.success('Instruccion actualizada!!');
                    console.log(response.data)
                    window.location.reload();
                }
            ).catch(e=>{
                console.log(e.response.data)
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
        this.getInstrucciones(this.state.id)
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title='Editar Instruccion' onClick={this.encenderModal}/>
                <Modal
                    title="Editar Instrucción "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                    {this.state.instruccion.map((value)=>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                instruccion: value.instruccion,
                                nivelInstrucion: value.nivelInstrucion,
                                institucion: value.institucion,
                                especializacion: value.especializacion,
                            }}
                        >
                            <Form.Item
                                label={<><BookOutlined/> Instruccion academica</>}
                                name="instruccion"
                                rules={[{required: true,whitespace:true, message: 'Por favor ingrese una instrucción' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><StockOutlined/> Nivel de instrucción</>}
                                name="nivelInstrucion"
                                rules={[{ required: true,whitespace:true, message: 'Por favor ingrese un nivel de instrucción' }]}
                            >
                                <Select style={{ width: 120 }}>
                                    <Option value="Sin estudio">Sin estudio</Option>
                                    <Option value="Primario">Primario</Option>
                                    <Option value="Profesional">Profesional</Option>
                                    <Option value="Secundario">Secundario</Option>
                                    <Option value="Superior incompleto">Superior incompleto</Option>
                                    <Option value="Superior">Superior</Option>
                                    <Option value="Cuarto nivel">Cuarto nivel</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={<><BankOutlined/> Institución</>}
                                name="institucion"
                                rules={[{whitespace:true, message: 'Ingrese la institucion' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={<><CrownOutlined/> Area de estudio</>}
                                name="especializacion"
                                rules={[{whitespace:true, message: 'Ingrese una area de estudio' }]}
                            >
                                <Select style={{ width: 120 }}>
                                    <Option value="Aguas y Sanamiento ambiental">Aguas y Sanamiento ambiental</Option>
                                    <Option value="Desarrollo de Software">Desarrollo de Software</Option>
                                    <Option value="Electromecánica">Electromecánica</Option>
                                    <Option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</Option>
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
                    )}

                </Modal>
            </div>
        )
    }
}
