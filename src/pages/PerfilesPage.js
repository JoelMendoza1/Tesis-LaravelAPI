import React from "react";
import {API} from "../services/API";
import axios from "axios";
import useAuth from "../auth/useAuth";
import {Row, Col, Avatar, Card, PageHeader, Typography, List} from 'antd';
import { UserOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import ModalEditUser from "../components/Perfil/ModalEditUser";
import CargarImgen from "../components/Perfil/CargarImgen";
import ModalEditPassword from "../components/Perfil/ModalEditPassword";
//import CargarImgen from "../components/Perfil/CargarImgen";

const { Title } = Typography;
export default class PerfilesPage  extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuarios: [],
            imagen:[]
        })
    }
    componentDidMount(){
        console.log(useAuth.usuarios);
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response.data.image)
                if (response.data.image==null){
                    const nuevoDato= "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }else{
                    const dato= response.data.image
                    const nuevoDato= "http://localhost:8000/storage"+dato.substring(6);
                    console.log(nuevoDato)
                    //response.data.image
                    this.setState({
                        usuarios: [response.data],
                        imagen:[nuevoDato]
                    })
                }


            }).catch(e=>{
                console.log(e.response.data)
            })


    }


//{value.name[0]} {value.lastname[0]}

    render(){

        return(
            <div>

                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={<Title level={4}><UserOutlined /> Perfil</Title>}
                    subTitle="En este módulo permitirá al usuario ver, editar, cambiar contraseña y cambiar foto de perfil."
                    style={{background:"#ffffff"}}
                />
                    {this.state.usuarios.map((value, index) => (
                        <Card key={index} style={{height:'80vh', paddingBottom:'0px'}}>
                            <InfiniteScroll>
                            <Card style={{height:'18vh',paddingTop:'20px', background:'#55556D', paddingBottom:'0px'}} >
                                <Row justify="start" align="top">
                                    <Col span={8}>
                                        <Avatar size={{ xs: 72, sm: 96, md: 120, lg: 192, xl: 240, xxl: 300 }}
                                                style={{
                                                    color: '#000000',
                                                    backgroundImage: `url('${this.state.imagen}')`,
                                                    backgroundSize: '100% 100%',
                                                    borderColor:"#ffffff",
                                                    borderSize:"30px"
                                                }}>
                                        </Avatar>
                                        <CargarImgen id={value.id}/>
                                        <ModalEditUser/>
                                        <ModalEditPassword/>
                                    </Col>
                                    <Col span={10}>
                                        <Title level={2} style={{color:"#ffffff"}}>{value.name} {value.lastname}</Title>
                                    </Col>
                                </Row>
                            </Card>
                            <Row key={index} justify="end">
                                <Col span={17}>
                                    <List>
                                        <List.Item>
                                            <Title level={5}>Email: {value.email}</Title>
                                        </List.Item>
                                        <List.Item>
                                            <Title level={5}>Cédula: {value.identificationCard}</Title>
                                        </List.Item>
                                        <List.Item>
                                            <Title level={5}>Teléfono: {value.telephoneNumber}</Title>
                                        </List.Item>
                                        <List.Item>
                                            <Title level={5}>Dirección: {value.address}</Title>
                                        </List.Item>
                                        <List.Item>
                                            <Title level={5}>Fecha de nacimiento: {value.dateOfBirth}</Title>
                                        </List.Item>
                                        <List.Item>
                                            <Title level={5}>Institución: {value.institution}</Title>
                                        </List.Item>
                                    </List>
                                </Col>
                            </Row>
                            </InfiniteScroll>
                        </Card>
                        ))}
            </div>
            )

    }
}