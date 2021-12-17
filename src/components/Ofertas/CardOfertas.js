import {Avatar, Col, Row, Card, Pagination, Badge, Descriptions, Input, message, Typography} from "antd";
import {BookOutlined,EnvironmentOutlined,TeamOutlined,ClockCircleOutlined } from "@ant-design/icons";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import BotonPostular from "./BotonPostular";
const { Search } = Input;
const { Title } = Typography;
export default class CardOfertas extends React.Component{
    constructor() {
        super();
        this.state =({
            ofertas:[],
            imagen:[],
            totalPages:0,
            buscarTerm:"",
            user_id:0
        })
    }
    componentDidMount(page) {
        this.getOferta(page)
        this.getUser()
    }
    getUser=()=>{
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
                message.success("Usuario encontrado! "+ response.data.id)
            }
        )
    }
    getOferta (page) {
        let url = API + 'ofertas?page='+page;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: {
                Authorization: `Bearer ${t}`,
                Accept: 'application/json'
            }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response)
                this.setState({
                    ofertas: response.data.data,
                    totalPages: response.data.meta.total
                })
                console.log(this.state.ofertas)
            }
        )
    }
    onChange = (page) => {
        console.log(page);
        this.componentDidMount(page)
    };
    showTotal=(total)=> {
        return `Total ${total} items`;
    };
    render(){

        return(
            <div>
                    <Card>
                        <Search placeholder="Busca tú oferta o carrera"
                                style={{
                                    width: 400,
                                    marginTop:'20px',
                                    marginRight:'auto',
                                    marginLeft:'auto',
                                    display:'block',
                                }}
                                onChange={event=>{
                                    console.log(event.target.value)
                                    this.setState({
                                        buscarTerm:event.target.value
                                })
                                }}
                        />
                        {this.state.ofertas.filter((value => {
                            if(this.state.buscarTerm === ""){
                                return value
                            }else if (value.oferta.toLowerCase().includes(this.state.buscarTerm.toLowerCase())||value.carreraOferta.toLowerCase().includes(this.state.buscarTerm.toLowerCase())){
                                return value
                            }
                        })).map((value, index) =>
                            <Card key={index}
                                  style={{
                                      marginTop:'30px',
                                      paddingTop:'30px',
                                      width:'800px',
                                      alignItems:'center',
                                      marginRight:'auto',
                                      marginLeft:'auto',
                                      display:'block',
                                      background:"#55556D"
                                  }}
                                  actions={[
                                      <BotonPostular idoferta={value.id} iduser={this.state.user_id}/>,
                                  ]}
                            >
                                <Row>
                                    <Col span={7}>
                                        <Title level={5} type="secondary">
                                            <Avatar
                                                size={30}
                                                style={{
                                                    color: '#000000',
                                                    backgroundImage: `url('http://localhost:8000/storage${value.empresa_id.imagen.substring(6)}')`,
                                                    backgroundSize: '100% 100%',
                                                    marginRight:'20px',
                                                }}
                                            />
                                            {value.empresa_id.nombreEmpresa}
                                        </Title>
                                    </Col>
                                    <Col span={9}>
                                        <Title level={5}
                                               style={true ? { width: 250 } : undefined}
                                               ellipsis={true ? { tooltip: value.oferta } : false}
                                        >{value.oferta} </Title>
                                    </Col>
                                    <Col span={4}>
                                        <Title level={5} disabled>°- {value.updated_at.substring(0,value.updated_at.length -17 )}</Title>
                                    </Col>
                                    <Col span={4}>
                                        {
                                            (value.visible )?
                                                (value.numberoPostulantes<=0)?<Badge status="processing" text="No disponible" style={{color:"#ffffff"}}/>
                                                    :<Badge status="success" text="Disponible" style={{color:"#ffffff"}}/>
                                                :<Badge status="error" text="Terminada" style={{color:"#ffffff"}}/>
                                        }
                                    </Col>

                                </Row>
                                <Descriptions
                                    title="Descripción"
                                    style={{
                                        marginTop:'20px',
                                        marginBottom:'20px',
                                        width:'600px',
                                        marginRight:'auto',
                                        marginLeft:'auto',
                                        display:'block',
                                        background:"#ffffff",
                                        padding:'20px'
                                    }}
                                >
                                    <Descriptions.Item>{value.descripcionOferta}</Descriptions.Item>
                                </Descriptions>
                                <Title level={4}><ClockCircleOutlined /> Horario: {value.horario}</Title>
                                <Title level={4}><TeamOutlined /> Pasantes disponibles: {value.numberoPostulantes}</Title>
                                <Title level={4}><EnvironmentOutlined /> Dirección: {value.direcionOferta}</Title>
                                <Title level={4}><BookOutlined /> Carrera: {value.carreraOferta}</Title>
                            </Card>
                        )}
                    </Card>
                <Pagination
                    showSizeChanger={false}
                    size="small"
                    debounceTimeout={300}
                    onChange={this.onChange}
                    total={this.state.totalPages}
                    showTotal={this.showTotal}
                />
            </div>
        )
    }

}