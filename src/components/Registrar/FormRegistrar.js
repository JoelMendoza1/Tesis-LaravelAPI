import React from "react";
import {Button, Card, DatePicker, Form, Input, message, Result, Switch} from "antd";
import { Steps } from 'antd';
import InfiniteScroll from "react-infinite-scroller";
import {FileDoneOutlined, FileExclamationOutlined, FileImageOutlined, LoadingOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import Routes from "../../constants/routes";
import stylesNavigation from "../../styles/navigation.css";
import {API} from "../../services/API";
import axios from "axios";

const { Step } = Steps;
export default function FormRegistrar(){
    const [current, setCurrent] = React.useState(0);
    const [empresaOrPasante, setEmpresaOrPasante]=React.useState({
        usuario:'Pasante',
        institucionMensaje:'Ingresa la institución de tú universidad!!',
        carrera: '',
        semestre: '',
        document: 'Cargar curriculum academico',
        registarURL: 'registrarPasante'
    });
    const [selectedFile, setSelectedFile]=React.useState("");
    const [nameFile, setNameFile]=React.useState("");
    const [selectedImage, setSelectedImage]=React.useState("");
    const [nameImage, setNameImage]=React.useState("");
    const [loding, setLoding]=React.useState(null);
    const [user, setUser]=React.useState({
        name:""
    })
    const [isFile,setIsFile]=React.useState(false);
    const [isImage,setIsImage]=React.useState(false);
    const [nextButton,setNextButton]=React.useState('none');
    const setDatos = (data) => {
        setUser(data)
        console.log(data)
        console.log(user)
        setCurrent(current + 1);
    }
    const next = () => {
        const datos =new FormData();
        datos.append('name', user.name);
        datos.append('lastname', user.lastname);
        datos.append('email', user.email);
        datos.append('identificationCard', user.identificationCard);
        datos.append('telephoneNumber', user.telephoneNumber);
        datos.append('address', user.address);
        datos.append('dateOfBirth', user.dateOfBirth);
        datos.append('career', user.career);
        datos.append('institution', user.institution)
        datos.append('semester', user.semester)
        datos.append('password', user.password)
        datos.append('password_confirmation', user.password_confirm)
        datos.append('document', selectedFile)
        datos.append('image', selectedImage)
        datos.append('descriptionRequest', 'Espere estamos procesando su solicitud para añadirse a esta plataforma')
        let url = API +empresaOrPasante.registarURL;

        axios.post(url,datos).then(
            response=>{
                message.success('Nueva capacitación  ingresada!!');
                console.log(response.data)
                setCurrent(current + 1);
            }
        ).catch(e=>{
            console.log(e.response.data)
            console.log(e)
            message.error(e.response.data);
        })

    };

    const prev = () => {
        setCurrent(current - 1);
        setNextButton('none')
        setIsFile(false)
        setIsImage(false)
    };
    const EmpresaOrPasante = (data) => {
        if(data===true){
            setEmpresaOrPasante({
                usuario:"Empresa",
                institucionMensaje:'Ingresa la institución de tú empresa!!',
                carrera: 'none',
                semestre: 'none',
                document: 'Cargar RUC',
                registarURL: 'registrarEmpresa'
            })
        }
        if (data===false){
            setEmpresaOrPasante({
                usuario:"Pasante",
                institucionMensaje:'Ingresa la institución de tú universidad!!',
                carrera: '',
                semestre: '',
                document: 'Cargar curriculum academico',
                registarURL: 'registrarPasante'
            })
        }
    }
    const fileSelectedHandler= event =>{
        setLoding(true)
        console.log(event.target.files[0].name)
        setSelectedFile(event.target.files[0])
        setNameFile(event.target.files[0].name)
        setIsFile(true)
        if(isImage===true){
            setNextButton('')

        }
        setLoding(false)
        message.success("Foto Cargada")
        message.info("Next para crear la contraseña")
    }
    const imageSelectedHandler= event =>{
        setLoding(true)
        console.log(event.target.files[0].name)
        setSelectedImage(event.target.files[0])
        setNameImage(event.target.files[0].name)
        setIsImage(true)
        if(isFile===true){
            setNextButton('')
        }
        setLoding(false)
        message.success("Foto Cargada")
        message.info("Next para crear la contraseña")
    }
    return(
        <>
            <Steps current={current}>
                <Step title="Empezar" />
                <Step title="Cargar documentos" />
                <Step title="Registrado" />
            </Steps>
            <div className="steps-content">
                {current ===0 && (
                    <div style={{height:'500px', margin:'auto',alignContent: 'center',padding:'40px',overflow:'auto'}}>
                        <InfiniteScroll style={{width:'400px'}}>
                            <Form
                                onFinish={setDatos}
                                initialValues={{
                                    name:user.name,
                                    lastname:user.lastname
                                }}
                            >
                                <Form.Item label={empresaOrPasante.usuario} valuePropName="checked">
                                    <Switch onChange={EmpresaOrPasante}/>
                                </Form.Item>
                                <Form.Item
                                    label='Nombres'
                                    name="name"
                                    rules={[{required: true,whitespace:true, message: 'Ingrese sus nombres!!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Apellidos'
                                    name="lastname"
                                    rules={[{required: true,whitespace:true, message: 'Ingrese sus apellidos!!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Email'
                                    name="email"
                                    rules={[{required: true,whitespace:true, message: 'Ingrese su email!!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Numero de identificacion'
                                    name="identificationCard"
                                    rules={[{required: true,whitespace:true, message: 'Ingrese su cédula de identidad o RUC!!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Telefono'
                                    name="telephoneNumber"
                                    rules={[{required: true,whitespace:true, message: 'Ingrese su número de telefono!!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Dirección'
                                    name="address"
                                    rules={[{required: true,whitespace:true, message: 'Ingrese su dirección!!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Fecha de Nacimiento'
                                    name="dateOfBirth"
                                >
                                    <DatePicker format={'DD/MM/YYYY'}/>
                                </Form.Item>
                                <Form.Item
                                    label='Carrera'
                                    name="career"
                                    rules={[{whitespace:true, message: 'Ingrese su carrera profesional!!' }]}
                                    style={{display:empresaOrPasante.carrera}}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Institución'
                                    name="institution"
                                    rules={[{required: true,whitespace:true, message: empresaOrPasante.institucionMensaje }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='Semestre'
                                    name="semester"
                                    rules={[{whitespace:true, message: 'Ingresa tú institución de tú universidad o empresa!!' }]}
                                    style={{display:empresaOrPasante.semestre}}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Contraseña"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Confirmar contraseña"
                                    name="password_confirm"
                                    rules={[{ required: true, message: 'Please input your password!' },({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Las dos contraseñas no coiciden!'));
                                        },
                                    })]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                    <Button type="primary" htmlType="submit" style={{
                                        backgroundColor: '#1E1E2F',
                                        color: '#ffffff',
                                        marginTop: '30px',
                                        border: "#ffffff"
                                    }}>
                                        Siguiente
                                    </Button>
                                </Form.Item>
                            </Form>
                        </InfiniteScroll>
                    </div>
                )}
                {current ===1 && (
                    <div style={{height:'500px', margin:'auto',alignContent: 'center', padding:'80px'}}>

                        <Card style={{height:'160px', margin:'auto',alignContent: 'center', padding:'20px'}}
                              title={empresaOrPasante.document}
                        >
                            {(loding===null)?<div><FileExclamationOutlined/></div>:
                                (loding===true)?<div><LoadingOutlined/></div>:
                                    <div><FileDoneOutlined/></div>
                            }
                            <input
                                type='file'
                                onChange={imageSelectedHandler}
                                //accept="image/*"
                            />
                        </Card>
                        <Card style={{height:'160px', margin:'auto',alignContent: 'center', padding:'20px', marginTop:'30px'}}
                              title="Cargar imagen de perfil"

                        >
                            {(loding===null)?<div><FileExclamationOutlined/></div>:
                                (loding===true)?<div><LoadingOutlined/></div>:
                                    <div><FileImageOutlined/></div>
                            }
                            <input
                                type='file'
                                onChange={fileSelectedHandler}
                                accept="image/*"
                            />
                        </Card>
                    </div>
                )}
                {current ===2 && (
                    <div style={{height:'500px'}}>
                        <Result
                            status="success"
                            title="Correctamente Registrado!"
                            subTitle={"Bienvenido "+user.name+' '+user.lastname}
                            extra={[
                                <Button style={{backgroundColor:'#292F36', color:'#ffffff'}}>
                                    <NavLink to={ Routes.LOGIN } className={stylesNavigation.active} exact>Iniciar Sesión</NavLink>
                                </Button>
                            ]}
                        />
                    </div>
                )}
            </div>
            <div className="steps-action">
                {current < 3 - 1 && current >0 &&(
                    <Button type="primary" onClick={()=>next()} style={{display:nextButton}}>
                        Next
                    </Button>
                )}

                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>

    )
}