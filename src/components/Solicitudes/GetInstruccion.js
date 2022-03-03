import React from "react";
import {Button, Card, Col, message, Row, Typography} from "antd";
import {BankOutlined, CrownOutlined, FileTextOutlined, StockOutlined} from "@ant-design/icons";
import {API} from "../../services/API";
import axios from "axios";
const {Text}= Typography;
export default class GetInstruccion extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            instrucciones: [],
            id: props.id
        })
    }
    componentDidMount(){
        this.getInstruccion(this.state.id)
    }
    getInstruccion= async (id) => {
        let url = API + 'users/'+id+'/instrucciones';
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
                console.log(response.data )
                this.setState({
                    instrucciones:response.data
                })
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Instruccion no encontrada!")
                if(this.state.c===0){
                    this.componentDidMount()
                    this.setState({c:1})
                }
            }
        )
    }
    render() {
        return(
            <div>
                {this.state.instrucciones.map((value, index) =>
                    <Card
                        key={index}
                        title={value.instruccion}
                        style={{background:'#55556D', margin:'10px'}}
                        extra={[
                            <Button
                                style={{
                                    background:'#237804',
                                    borderColor:'transparent'
                                }}
                                target="_blank"
                                type="primary"
                                icon={<FileTextOutlined />}
                                shape="circle"
                                title='Descargar certificado'
                                //href={API+`instrucciones/${value.id}/document`}
                                href={"http://localhost:8000/storage"+value.document.substring(6)}
                            />
                        ]}
                    >
                        <Row  align="middle">
                            <Col span={12}>
                                <Text level={5}> <StockOutlined/> <b>Nivel de instrucción: </b> {value.nivelInstrucion}</Text><br/>
                                <Text level={5}> <BankOutlined/> <b>Institución: </b> {value.institucion}</Text><br/>
                                <Text level={5}> <CrownOutlined/> <b>Especialización: </b> {value.especializacion}</Text><br/>
                            </Col>
                        </Row>
                    </Card>
                )}
            </div>
        )
    }
}