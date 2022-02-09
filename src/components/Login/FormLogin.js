import React from "react";
import {Button, Card, Checkbox, Form, Input, message, Typography} from "antd";
import {NavLink, useHistory} from "react-router-dom";
import Routes from "../../constants/routes";
import {KeyOutlined, MailOutlined, ReadOutlined} from "@ant-design/icons";
import useAuth from "../../auth/useAuth";
import {API} from "../../services/API";
import axios from "axios";
const { Title } = Typography;
export default function FormLogin(){
    const  history = useHistory();
    const auth= useAuth();
    /*const state={
        error:true,
        message:""
    }*/
    const ingresarDashboard=(request, response)=>{
            auth.login(response.data.token);
            history.push(Routes.DASHBOARD);
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
            console.error( 'No se pudo iniciar sesión', e.message );

        }

    };
    return(
        <Card

            style={{
                alignContent: 'center',
                margin: 'auto',
                backgroundColor: "rgba(255, 255, 255, 0)",
                border:"transparent",
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
                    width:'450px'
                }}
            >
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
    )
}