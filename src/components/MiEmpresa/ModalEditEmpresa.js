import React from "react";
import {AutoComplete, Button, Form, Input, Modal, Select,message} from "antd";
import {FileImageOutlined,} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import axios from "axios";
import {API} from "../../services/API";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default class ModalEditEmpresa extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
                //usuarios: [],
                modal: false,
                fileList: [],
                imageUrl: null,
                user_id: props.iduser,
                empresa_id: props.idempresa
            }
        )
    }
    componentDidMount(){

    }
    okModal=async (userData)=>{
        console.log(userData)
        const datos ={
            RUC: userData.ruc,
            nombreEmpresa: userData.razonSocial,
            tipoEmpresa: userData.tipoEmpresa,
            telefonoEmpresa: userData.telefono,
            emailEmpresa:userData.email,
            direccionEmpresa: userData.direccion,
            imagen: this.state.fileList[0]
        }
        console.log(datos)
        console.log(this.state.user_id)
        console.log(this.state.empresa_id)
        let url = API +'empresas/'+this.state.empresa_id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.put(url,datos, config).then(
            response=>{
                message.success('Actualizado');
                console.log(response.data)
                console.log(response.data.request)
                console.log(response.data.descriptionRequest)
                window.location.reload();
            }
        ).catch(e=>{
            console.log(e.message)
            message.error('Error '+e);
        })
    }
    apagarModal=()=>{
        this.setState({
            modal: false
        })
    }
    encenderModal=()=>{
        this.setState({
            modal: true
        })
    }
    normPhotoFile = e => {
        console.log( 'Upload event:', e );
        const file = e.file;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if( !isJpgOrPng ) {
            message.error( 'La imagen debe tener formato JPG o PNG' );
            this.setState({
                fileList:[],
                imageUrl: null,
            })
            return null;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if( !isLt2M ) {
            message.error( 'La imagen debe ser menor a 2MB' );
            this.setState({
                fileList:[],
                imageUrl: null,
            })
            return null;
        }

        if( file.status === 'removed' ) {
            this.setState({
                fileList:[],
                imageUrl: null,
            })
            return null;
        }

        getBase64(e.file, imageUrl =>
            this.setState({
                imageUrl,
            }))

        if( Array.isArray( e ) ) {
            return e;
        }

        console.log( 'e.file', e.file );
        console.log( 'e.fileList', e.fileList );

        this.setState({
            fileList:[ e.file ],
        })
        return null;
        return e && [ e.file ] && e.fileList;
    };
    handleChangePhoto = info => {
            this.setState({
                imageUrl: info.image,
                loading: false,
            })
    };
    render() {
        return(
            <div>
                <Button  type="primary" shape="round" onClick={this.encenderModal}>Editar Empresa</Button>
                <Modal
                    title="Editar Perfil "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.okModal}
                        //onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name='image'
                            label='Imagen de perfil'
                            valuePropName='fileList'
                            getValueFromEvent={ this.normPhotoFile }
                            /*rules={ [
                                {
                                    required: true,
                                    message: 'Sube tu foto'
                                }
                            ] }*/
                        >
                            <input
                                    type='file'
                                    accept='image/jpeg,image/png'
                                    onChange={ this.handleChangePhoto }
                            >
                                { this.state.imageUrl
                                    ? <img src={ this.state.imageUrl } alt='Foto' style={ { width: '80px' } } />
                                    : <div>
                                        <FileImageOutlined />
                                        <div className='ant-upload-text'>Upload</div>
                                    </div> }
                            </input>
                        </Form.Item>
                        <Form.Item
                            label="Razón social"
                            name="razonSocial"
                            rules={[{ required: true, message: 'Por favor ingrese su la Razón Socail de tú empresa!' }]}
                        >
                            <Input placeholder="Razón Social"/>
                        </Form.Item>
                        <Form.Item
                            label="RUC"
                            name="ruc"
                            rules={[{ required: true, message: 'Por favor ingrese el RUC de su empresa!' }]}
                        >
                            <Input placeholder="RUC"/>
                        </Form.Item>
                        <Form.Item
                            label="Tipo de empresa"
                            name="tipoEmpresa"
                            rules={[{ required: true, message: 'Seleccione una de las opciones!' }]}
                        >
                            <Select  style={{ width: 120 }}>
                                <Option value="Publica">Publica</Option>
                                <Option value="Privada">Privada</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Télefono"
                            name="telefono"
                            rules={[{ required: true, message: 'Por favor ingrese su número de télefono!' }]}
                        >
                            <Input placeholder="0900000000"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Por favor ingrese un Email!' }]}
                        >
                            <AutoComplete
                                style={{ width: '70%' }}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dirección"
                            name="direccion"
                            rules={[{ required: true, message: 'Por favor ingrese su número de cédula!' }]}
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
                                Editar
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}