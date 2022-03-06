import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import {Col, Row, Card, Avatar, message, Typography, List, PageHeader, Spin} from "antd";
import ModalEditEmpresa from "./ModalEditEmpresa";
import ModalCrearEmpresa from "./ModalCrearEmpresa";
import {ShopOutlined} from "@ant-design/icons";
import EditImageEmpresa from "./EditImageEmpresa";
import {URLH} from "../../services/URLH";
const { Title } = Typography;
export default class MiEmpresa extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            empresa:[],
            user_id: 0,
            loading:true
        })
    }
    getUser=async ()=>{
        let url = API + 'usuarios';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                this.setState({
                    user_id:response.data.id
                })
                this.getEmpresa(response.data.id)
            }
        )
    }
    getEmpresa=async(id)=>{
        console.log(id)
        let url = API + 'users/'+id+'/empresas';
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    empresa:[response.data],
                    loading:false
                })
            }
        ).catch(
            e=>{
                console.log(this.state.empresa)
                console.log(e.message)
                message.error("Empresa no encontrada!")
            }
        )
        this.setState({
            loading:false
        })
    }
    componentDidMount() {
        this.getUser();
    }
    render() {
        return(
            <div >
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={<Title level={4}><ShopOutlined /> My Empresa</Title>}
                    subTitle="En este módulo permite gestionar la información de perfil de la empresa"
                    style={{background:"#ffffff"}}
                />
                <Card style={{height:'80vh', overflow:'auto', paddingTop:'60px'}}>
                    {
                        (this.state.loading)?
                            <Spin size="large" />
                            :
                            <div>
                                {(this.state.empresa.length!==0) ?
                                    <InfiniteScroll>
                                        {this.state.empresa.map((value, index) => (
                                            <div>
                                                <Card style={{height:'18vh',paddingTop:'20px', background:'#55556D', paddingBottom:'0px'}} >
                                                    <Row justify="start" align="top">
                                                        <Col span={10} >
                                                            <Avatar size={{ xs: 72, sm: 96, md: 120, lg: 192, xl: 240, xxl: 300 }}
                                                                    style={{
                                                                        color: '#000000',
                                                                        backgroundImage: `url('${URLH}storage${value.imagen.substring(6)}')`,
                                                                        backgroundSize: '100% 100%',
                                                                        borderColor:"#ffffff",
                                                                        borderSize:"30px"
                                                                    }}
                                                            />
                                                            <ModalEditEmpresa idempresa={value.id} iduser={this.state.user_id}/>
                                                            <EditImageEmpresa idempresa={value.id}/>
                                                        </Col>
                                                        <Col span={10}>
                                                            <Title level={2} style={{color:"#ffffff"}}>{value.nombreEmpresa}</Title>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                                <Row key={index} justify="end">
                                                    <Col span={17}>
                                                        <List>
                                                            <List.Item>
                                                                <Title level={5}>RUC: {value.RUC}</Title>
                                                            </List.Item>
                                                            <List.Item>
                                                                <Title level={5}>Tipo de empresa: {value.tipoEmpresa}</Title>
                                                            </List.Item>
                                                            <List.Item>
                                                                <Title level={5}>Teléfono: {value.telefonoEmpresa}</Title>
                                                            </List.Item>
                                                            <List.Item>
                                                                <Title level={5}>Email: {value.emailEmpresa}</Title>
                                                            </List.Item>
                                                            <List.Item>
                                                                <Title level={5}>Dirección: {value.direccionEmpresa}</Title>
                                                            </List.Item>
                                                        </List>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))
                                        }
                                    </InfiniteScroll> :
                                    <div>
                                        <ModalCrearEmpresa iduser={this.state.user_id}/>
                                    </div>
                                }
                            </div>
                    }

                </Card>
            </div>
        )
    }
}