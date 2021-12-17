import React from "react";
import {Avatar, Col, Pagination, Row} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import ReprobarUser from "./ReprobarUser";
import ModalGetUser from "./ModalGetUser";
import {API} from "../../services/API";
import axios from "axios";
import AprobarUser from "./AprobarUser";
import DownloadDocumentUser from "./DownloadDocumentUser";

export default class TablePendientesSolicitudes extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            usuarios: [],
            link:[],
            totalPages: 0,
        })
    }
    componentDidMount(page){
        this.consultaAPI(page)
    }
    async consultaAPI(page){
        let url = API + 'pendientes?page='+page;
        console.log(url)
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        axios.get(url, config).then(
            response=>{
                console.log(response.data)
                this.setState({
                    usuarios: response.data.data,
                    link: [response.data.link],
                    totalPages: response.data.meta.total
                })
                console.log(this.state.usuarios)
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
    render() {
        return(
            <div>
                <table className="default" style={{background:'#55556D', margin:'auto', borderColor:'#ffffff'}}>
                    <thead style={{background:'#1E1E2F', color:'#ffffff',borderColor:'#ffffff'}}>
                    <tr>
                        <th style={{width:'300px'}}>Usuario </th>
                        <th style={{width:'150px'}}>Estado</th>
                        <th style={{width:'50px'}}>Documento</th>
                        <th style={{width:'120px'}}>Acciones</th>
                        <th style={{width:'100px'}}>Ver Perfil</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.usuarios.map((value, index) =>
                        <tr key={index}>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <Avatar
                                    style={{
                                        color: '#000000',
                                        backgroundImage: `url('http://localhost:8000/storage${value.image.substring(6)}')`,
                                        backgroundSize: '100% 100%',
                                        marginRight:'10px'
                                    }}>
                                    {value.name[0]} {value.lastname[0]}
                                </Avatar>{value.name} {value.lastname}</td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <h5 style={{color:"yellow", fontSize:'15px'}}><ClockCircleOutlined /> Pendiente</h5>
                            </td>
                            <td >
                                <DownloadDocumentUser id={value.id}/>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <Row>
                                    <Col span={12}>
                                        <ReprobarUser id={value.id}/>
                                    </Col>
                                    <Col span={12}>
                                        <AprobarUser id={value.id}/>
                                    </Col>
                                </Row>
                            </td>
                            <td style={{fontSize:'15px', paddingLeft:'20px', paddingRight:'20px'}}>
                                <ModalGetUser id={value.id}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
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