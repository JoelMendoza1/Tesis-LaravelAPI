import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import {
    PlusOutlined,
    UploadOutlined, ProjectOutlined, BankOutlined, CalendarOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
const { RangePicker } = DatePicker;

export default class CrearCapacitacion extends React.Component{
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
                datos.append('nombreCapacitacion', userData.capacitacion);
                datos.append('nombreInstitucionCapacitadora', userData.institucion);
                datos.append('fechaInicioCapacitacion', userData.periodo[0].format('DD/MM/YYYY'));
                datos.append('fechaFinCapacitacion', userData.periodo[1].format('DD/MM/YYYY'));
                datos.append('document', this.state.selectedFile);
                /*const datos= {
                    nombreCapacitacion: userData.capacitacion,
                    nombreInstitucionCapacitadora: userData.institucion,
                    fechaInicioCapacitacion: userData.periodo,
                    fechaFinCapacitacion: userData.periodo,
                    document: this.state.selectedFile
                }*/
                console.log(datos, userData)
                let url = API +'users/'+this.state.id+'/capacitacions';
                const token =localStorage.getItem('token')
                const t= token.replace(/['"]+/g, '')
                const config = {
                    headers: { Authorization: `Bearer ${t}`,
                        Accept: 'application/json'
                    }
                };
                axios.post(url,datos, config).then(
                    response=>{
                        message.success('Nueva capacitación  ingresada!!');
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
                    title='Crear Capacitación'
                    onClick={this.encenderModal}
                />
                <Modal
                    title="Crear Capacitación "
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
                        <label><UploadOutlined/> Carga tu certificado:</label><input type='file' onChange={this.fileSelectedHandler}/>
                        <br/>
                        <Form.Item
                            label={<><ProjectOutlined/> Capacitacion</>}
                            name="capacitacion"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese el nombre de la capacitación!!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<><BankOutlined/> Institución capacitadora</>}
                            name="institucion"
                            rules={[{required: true,whitespace:true, message: 'Por favor ingrese la institución capacitadora!!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<><CalendarOutlined/> Periodo de la capacitación</>}
                            name="periodo"
                            //rules={[{ required: true,whitespace:true, message: 'Por favor ingrese el inicio y fin de la capacitación' }]}
                        >
                            <RangePicker format={'DD/MM/YYYY'}/>
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