import {Button, Form, Input, message, Modal, Select} from "antd";
import {
    PlusOutlined,
    BankOutlined,
    StockOutlined,
    BookOutlined,
    CrownOutlined,
    UploadOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
const { Option } = Select;

export default class CrearInstruccion extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuario: [],
            id:0,
            selectedFile: null,
            nameFile: null
        })
    }
    fileSelectedHandler= event =>{
        console.log(event.target.files[0].name)
        this.setState({
            selectedFile: event.target.files[0],
            nameFile:event.target.files[0].name
        })
        message.success("Documento cargado")
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
            if(this.state.selectedFile===null){
                message.error("Certificado no cargado");
            }else{
                const datos =new FormData();
                datos.append('instruccion', userData.instruccion);
                datos.append('nivelInstrucion', userData.nivelInstrucion);
                datos.append('institucion', userData.institucion);
                datos.append('especializacion', userData.especializacion);
                datos.append('document', this.state.selectedFile);
                /*const datos= {
                    instruccion: userData.instruccion,
                    nivelInstrucion: userData.nivelInstrucion,
                    institucion: userData.institucion,
                    especializacion: userData.especializacion,
                    document: this.state.selectedFile
                }*/
                console.log(datos, userData)
                let url = API +'users/'+this.state.id+'/instrucciones';
                const token =localStorage.getItem('token')
                const t= token.replace(/['"]+/g, '')
                const config = {
                    headers: { Authorization: `Bearer ${t}`,
                        Accept: 'application/json'
                    }
                };
                axios.post(url,datos, config).then(
                    response=>{
                        message.success('Nueva instrucción  ingresada!!');
                        console.log(response.data)
                        window.location.reload();
                    }
                ).catch(e=>{
                    console.log(e.response.data)
                    console.log(e)
                    message.error(e.response);
                })
            }

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
                    title='Crear Instrucción'
                    onClick={this.encenderModal}
                />
                <Modal
                    title="Crear Intrucción "
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
                        <label><UploadOutlined/> Carga tu certificado:</label><input type='file' onChange={this.fileSelectedHandler} accept=".pdf"/>
                        <br/>
                        <Form.Item
                            label={<><BookOutlined/> Instruccion academica</>}
                            name="instruccion"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese una instrucción' },{
                                pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                message: 'Ingresar solo letras!',
                                type:'string',
                            }]}
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
                            rules={[{required:true,whitespace:true, message: 'Ingrese la institucion' },{
                                pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                message: 'Ingresar solo letras!',
                                type:'string',
                            }]}
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
                                Crear
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}