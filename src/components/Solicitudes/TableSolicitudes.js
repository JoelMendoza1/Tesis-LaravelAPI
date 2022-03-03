import React from "react";
import {Avatar, Row, Col, Table, Alert} from "antd";
import ReprobarUser from "./ReprobarUser";
import ModalGetUser from "./ModalGetUser";
import {API} from "../../services/API";
import axios from "axios";
import AprobarUser from "./AprobarUser";
import DownloadDocumentUser from "./DownloadDocumentUser";
import Search from "antd/es/input/Search";
export default class TableSolicitudes extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
        usuarios: [],
        link:[],
            ruta:props.ruta,
            loading:true,
            buscarTerm:"",
        })
    }
    componentDidMount(page){
        this.consultaAPI(page)
    }
    async consultaAPI(page){
        let url = API + this.state.ruta;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                this.setState({
                    usuarios: response.data,
                    link: [response.data.link],
                    loading: false
                })
                console.log(response)
            }
        ).catch( e=>{
            console.log(e)
        })
    }


    onChange = (page) => {
        console.log(page);
        this.componentDidMount(page)
    };

    render() {
        const columns = [
            {
                title: 'Usuario',
                dataIndex: 'user',
                key: 'user',
                render: user =>
                    <div>
                        {user.map(ava =>
                            <div>
                                <Avatar
                                    style={{
                                        color: '#000000',
                                        backgroundImage: `url('http://localhost:8000/storage${ava.image}')`,
                                        backgroundSize: '100% 100%',
                                        marginRight:'10px'
                                    }}>
                                    {ava.name[0]} {ava.lastname[0]}
                                </Avatar>
                                {ava.name} {ava.lastname}
                            </div>
                        )}
                    </div>
                    ,
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                render: estado =>
                    <div>

                        {
                            (estado===null ) ? <Alert message={<> Pendiente</>} type="warning" showIcon /> :
                                (estado===0 ) ? <Alert message={<> Rechazado</>} type="error" showIcon />:
                                    <Alert message={<> Autorizado</>} type="success" showIcon/>

                        }
                    </div>,
            },
            {
                title: 'Acciones',
                dataIndex: 'acciones',
                key: 'acciones',
                render: aciones =>
                    <div>
                        {aciones.map(ac =>
                        <Row>
                            <Col span={3}>
                                <DownloadDocumentUser id={ac.id}/>
                            </Col>
                            <Col span={3}>
                                <ModalGetUser id={ac.id}/>
                            </Col>
                            <Col span={6}>
                                {
                                    (ac.request===null ) ?
                                        <div>
                                            <Row>
                                                <Col span={12}>
                                                    <ReprobarUser id={ac.id}/>
                                                </Col>
                                                <Col span={12}>
                                                    <AprobarUser id={ac.id}/>
                                                </Col>
                                            </Row>

                                        </div>:
                                        (ac.request===0 ) ?
                                            <AprobarUser id={ac.id}/>:
                                            <ReprobarUser id={ac.id}/>
                                }
                            </Col>
                        </Row>

                            )}
                    </div>,
            },
        ]
        const data = [];
        this.state.usuarios.filter((value => {
            if(this.state.buscarTerm === ""){
                return value
            }else if (value.name.toLowerCase().includes(this.state.buscarTerm.toLowerCase())||value.lastname.toLowerCase().includes(this.state.buscarTerm.toLowerCase())){
                return value
            }
        })).map((value, index) =>
            data.push({
                key: index,
                user: [{name:value.name,lastname:value.lastname,image:value.image.substring(6)}],
                estado: value.request,
                acciones: [{id:value.id,request:value.request}]

            })
        )
        return(

            <div>
                <Search placeholder="Busca el nombre o apellido del usuario"
                        style={{
                            width: 400,
                            marginTop:'20px',
                            marginRight:'auto',
                            marginLeft:'auto',
                            display:'block',
                            paddingBottom:'20px'
                        }}
                        onChange={event=>{
                            console.log(event.target.value)
                            this.setState({
                                buscarTerm:event.target.value
                            })
                        }}
                />
                <Table columns={columns} dataSource={data} loading={this.state.loading} bordered/>
            </div>
        )
    }
}