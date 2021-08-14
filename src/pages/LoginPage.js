import React from "react";
import useAuth from "../auth/useAuth";
import {NavLink, useHistory} from "react-router-dom";
import Routes from "../constants/routes";
import {Card, Layout, message} from 'antd';
import {API} from "../services/API"
import "../styles/login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import {MailOutlined, KeyOutlined, ReadOutlined} from '@ant-design/icons';
import axios from "axios";
import FooterComponent from "../components/FooterComponent";
//import ErrorList from '../components/ErrorList';

const { Footer } = Layout;
export default function LoginPage(){
    const  history = useHistory();
    const auth= useAuth();
    /*const state={
        error:true,
        message:""
    }*/
    const ingresarDashboard=(request, response)=>{
        console.log(request)
        if(request===1){
            auth.login(response);
            history.push(Routes.DASHBOARD);
        }else{
            auth.login(response);
            history.push(Routes.CONFIRMATION);
        }
    }

    const onFinish = async(userData) => {
        try{
            let urlAPI = API +'inicioSesion';
            const datos = (  {
                email: userData.username,
                password: userData.password
            } );
            axios.post(urlAPI,{
                email: userData.username,
                password: userData.password
            }).then(response=>{

                console.log(response.status);
                if(response.statusText==="OK"){
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    const user={
                        nombre: response.data.user.name,
                        apellido: response.data.user.lastname
                    }
                    localStorage.setItem("username", JSON.stringify({user}))
                    console.log(response.data.user.request)
                    ingresarDashboard(response.data.user.request, response)
                }else{
                    console.log(response.data.result);
                    console.log("Hola");
                    auth.login(null)

                }

            }).catch(err=>{
                console.log(err.response.data.message);

                //const errorList = err.response.data.message && <ErrorList errors={ err.response.data.message } />;
                message.error( <>{ err.response.data.message }</> );
            })
            console.log(datos);

        }catch(e){
            console.log("Hola");
            console.error( 'No se pudo iniciar sesión', e.message );

        }

    };


    return(
        <div>
            <Card style={{
                background: "radial-gradient(80% 40%, white, #292F36)"
            }}
                  title="Inicio de Sesión" extra={<a href={Routes.HOME} >Home</a>}>

                <Card

                    style={{
                        marginTop: 16,
                        width: '700px',
                        alignContent: 'center',
                        margin: 'auto',
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border:"transparent",
                        marginBottom: '100px'
                    }}
                    type="inner"
                >

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        style={{
                            width:'500px'
                        }}
                    >
                        <NavLink to={ Routes.HOME } style={{color:'#292F36'}} exact>
                            <ReadOutlined style={{fontSize: '300px !important', color:'#292F36' }}/>
                        </NavLink>
                        <Form.Item
                            label={<label><KeyOutlined style={{fontSize: '1px !important', }}/> Email</label>}
                            name="username"
                            rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<label><MailOutlined style={{fontSize: '1px !important', }}/> Password</label>}
                            name="password"
                            rules={[{ required: true, message: 'Por favor ingresa tú contraseña!'}]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox >Recordar contraseña</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px', border:"#ffffff"}}>
                                Inciar Sesión
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Card>
            <Footer style={{ textAlign: 'center', backgroundColor:"#292F36"}}>
                <FooterComponent/>
                <div style={{marginTop:'50px', color:"#ffffff"}}>
                    Aplication ©2021 Created by Joel Mendoza
                </div>
            </Footer>
        </div>
    )
}