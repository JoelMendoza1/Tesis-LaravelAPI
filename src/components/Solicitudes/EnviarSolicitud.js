import React, { Component } from 'react';
import {Button, message} from "antd";
import axios from "axios";
import {API} from "../../services/API";
export  default class EnviarSolicitud extends Component{
    constructor(props) {
        super(props);
        this.state =({
            id: this.props.id,
            request:this.props.request,
            buttonState: false
        })
    }
    UploadHandler=()=>{
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        const data ={
            request: null,
            descriptionRequest: 'El proceso de verificación se encuentra en espera'
        }
        let url2 = API + 'users/'+this.state.id;
        axios.put(url2,data, config).then(
            response=>{
                message.success('Solicitud enviada');
                console.log(response.data)
                console.log(response.data.request)
                console.log(response.data.descriptionRequest)
                window.location.reload();
            }
        ).catch(e=>{
            console.log(e.response)
        })
    }
    componentDidMount() {
        this.buttonDisamble(this.state.request)
    }
    buttonDisamble(request){
        if(request===null){
            this.setState({
                buttonState: true
            })
        }
    }
    render() {
        return (
            <div>
                {
                    (this.state.request===null) ?
                        <Button
                            danger
                            onClick={this.UploadHandler}
                            style={{ marginTop:'15px', width:'26vh'}}
                            disabled={this.state.buttonState}
                        >
                            Enviar solicitud
                        </Button>
                        :(this.state.request===0)? <Button
                            danger
                            onClick={this.UploadHandler}
                            style={{ marginTop:'15px', width:'26vh'}}
                        >
                            Enviar solicitud
                        </Button>
                            :<></>
                }
            </div>
        );
    }
}
