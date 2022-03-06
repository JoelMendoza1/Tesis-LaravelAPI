import {Button, Form, message, Modal} from "antd";
import { BookOutlined, FileSyncOutlined} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
export default class EditarCapacitacionDocument extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            id:props.id,
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
    componentDidMount() {
        //this.getIdioma(this.state.id)
    }
    okModal=async (userData)=>{
        try{
            const datos =new FormData();
            datos.append('document', this.state.selectedFile);
            console.log(datos)
            let url = API +'capacitacionDocument/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.post(url,datos, config).then(
                response=>{
                    message.success('Certificado actualizado!!');
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
        console.log(this.state.id)
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" shape="circle" icon={<FileSyncOutlined />} title='Editar certificado' onClick={this.encenderModal}/>
                <Modal
                    title="Editar Certificado "
                    visible={this.state.modal}
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
                    >
                        <Form.Item
                            label={<><BookOutlined/> Cargar cetificado</>}
                            name="document"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese el documento que va a cambiar' }]}
                        >
                            <input type='file' onChange={this.fileSelectedHandler} accept=".pdf"/>
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
}