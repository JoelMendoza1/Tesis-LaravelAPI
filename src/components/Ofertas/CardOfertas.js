import {Avatar, Col, Row, Card, Pagination, Badge, Descriptions, Input, message, Typography} from "antd";
import React from "react";
import {API} from "../../services/API";
import axios from "axios";
import BotonPostular from "./BotonPostular";
import VerOferta from "../Ofertar/VerOferta";
import {URLH} from "../../services/URLH";
const { Search } = Input;
const { Title } = Typography;
const pageSize = 9;
export default class CardOfertas extends React.Component{
    constructor() {
        super();
        this.state =({
            ofertas:[],
            imagen:[],
            buscarTerm:"",
            user_id:0,
            current: 1,
            minIndex: 0,
            maxIndex: 0,
            lenght:0
        })
    }
    componentDidMount() {
        this.getOferta()
        this.handleChange(this.state.current)
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
            }
        )
    }
    getOferta () {
        let url = API + 'ofertas';
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

                console.log(response.data)
                this.setState({
                    ofertas: response.data,
                    lenght: response.data.length,
                    totalPage: response.data.length / pageSize,
                })
                console.log(this.state.ofertas)
            }
        )
    }
    handleChange = (page) => {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };
    render(){
        //const { ofertas, current, minIndex, maxIndex } = this.state;
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
                        <Row gutter={[12, 12]}>
                        {this.state.ofertas.filter(((value) => {
                            if(this.state.buscarTerm === ""){
                                return value
                            }else if (value.oferta.toLowerCase().includes(this.state.buscarTerm.toLowerCase())||value.empresa_id.nombreEmpresa.toLowerCase().includes(this.state.buscarTerm.toLowerCase())){
                                this.setState({
                                    lenght: value.lenght
                                })
                                return value
                            }
                        })).map((value, index) =>
                            index >= this.state.minIndex &&
                            index < this.state.maxIndex && (
                                <Col span={8}>
                                    <Card key={index}
                                          style={{
                                              marginTop:'30px',
                                              paddingTop:'30px',
                                              width:'350px',
                                              alignItems:'center',
                                              marginRight:'auto',
                                              marginLeft:'auto',
                                              display:'block',
                                              background:"#1E1E2F"
                                          }}
                                          actions={[
                                              <BotonPostular idoferta={value.id} iduser={this.state.user_id}/>,
                                              <VerOferta id={value.id}>
                                                  Ver Oferta
                                              </VerOferta>
                                          ]}
                                    >
                                        <Title level={5} disabled style={{color: '#ffffff',}}>°- {value.updated_at.substring(0,value.updated_at.length -17 )}</Title>
                                        <Row>
                                            <Col span={17}>
                                                <Title level={5} type="secondary0" style={{color: '#ffffff',}}>
                                                    <Avatar
                                                        size={30}
                                                        style={{
                                                            color: '#ffffff',
                                                            backgroundImage: `url('${URLH}storage${value.empresa_id.imagen.substring(6)}')`,
                                                            backgroundSize: '100% 100%',
                                                            marginRight:'20px',
                                                        }}
                                                    />
                                                    {value.empresa_id.nombreEmpresa}
                                                </Title>
                                            </Col>
                                            <Col span={7} >
                                                {
                                                    (value.visible )?
                                                        (value.numberoPostulantes<=0)?<Badge status="processing" text="No disponible" style={{color:"#ffffff"}}/>
                                                            :<Badge status="success" text="Disponible" style={{color:"#ffffff"}}/>
                                                        :<Badge status="error" text="Terminada" style={{color:"#ffffff"}}/>
                                                }
                                            </Col>
                                        </Row>
                                        <Title level={5}
                                               style={true ? { width: 250,color: '#ffffff' } : undefined}
                                               ellipsis={true ? { tooltip: value.oferta } : false}
                                        >{value.oferta} </Title>
                                        <Descriptions
                                            title="Descripción"
                                            style={{
                                                marginTop:'20px',
                                                marginBottom:'20px',
                                                marginRight:'auto',
                                                marginLeft:'auto',
                                                display:'block',
                                                background:"#ffffff",
                                                padding:'20px'
                                            }}
                                        >
                                            <Descriptions.Item>{value.descripcionOferta}</Descriptions.Item>
                                        </Descriptions>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                <Pagination
                    pageSize={pageSize}
                    current={this.state.current}
                    total={this.state.lenght}
                    onChange={this.handleChange}
                    defaultCurrent={1}
                    style={{ bottom: "0px" }}
                    showSizeChanger={false}
                />
            </div>
        )
    }

}