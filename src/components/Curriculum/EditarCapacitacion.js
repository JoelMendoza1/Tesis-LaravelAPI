import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import {
    EditOutlined, BankOutlined, ProjectOutlined, CalendarOutlined
} from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import moment from "moment";
export default class EditarCapacitacion extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            capacitacion: [],
            id:props.id,

        })
    }
    getCapacitacion= async (id)=>{
        let url = API + 'capacitacions/'+id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{

                this.setState({
                    capacitacion:[response.data],
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
            const datos= {
                nombreCapacitacion: userData.capacitacion,
                nombreInstitucionCapacitadora: userData.institucion,
                fechaInicioCapacitacion: userData.periodo[0].format('DD/MM/YYYY'),
                fechaFinCapacitacion: userData.periodo[1].format('DD/MM/YYYY'),
            }
            console.log(datos)
            let url = API +'capacitacions/'+this.state.id;
            const token =localStorage.getItem('token')
            const t= token.replace(/['"]+/g, '')
            const config = {
                headers: { Authorization: `Bearer ${t}`,
                    Accept: 'application/json'
                }
            };
            axios.put(url,datos, config).then(
                response=>{
                    message.success('Capacitación actualizada!!');
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
        this.getCapacitacion(this.state.id)
        this.setState({
            modal: true
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title='Editar Capacitación' onClick={this.encenderModal}/>
                <Modal
                    title="Editar Capacitación "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal} >
                    {this.state.capacitacion.map((value)=>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.okModal}
                            initialValues={{
                                capacitacion: value.nombreCapacitacion,
                                institucion: value.nombreInstitucionCapacitadora,
                                periodo:[
                                    moment(value.fechaInicioCapacitacion, 'DD/MM/YYYY'),
                                    moment(value.fechaFinCapacitacion, 'DD/MM/YYYY')
                                ],
                            }}
                        >
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
                                <DatePicker.RangePicker format={'DD/MM/YYYY'}/>
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