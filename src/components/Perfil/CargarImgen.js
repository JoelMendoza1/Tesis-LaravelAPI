import React, { Component } from 'react';
import {Button, message, Modal} from "antd";
import axios from "axios";
import {API} from "../../services/API";
import { PictureOutlined, UploadOutlined} from "@ant-design/icons";
export  default class CargarImgen extends Component{
    state ={
        selectedFile: null,
        nameFile: null,
        id: this.props.id
    }
    fileSelectedHandler= event =>{
        console.log(event.target.files[0].name)
        this.setState({
            selectedFile: event.target.files[0],
            nameFile:event.target.files[0].name
        })
        message.success("Foto Cargada")
        message.info("Presione el boton subir foto")
    }
    fileUploadHandler=()=>{
        let url = API + 'usersImagen/'+this.state.id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        const fd =new FormData();
        fd.append('image', this.state.selectedFile);
        //console.log(this.state.selectedFile)
        axios.post(url,fd,config).then(res=>{
            console.log(res);
            window.location.reload();

        }).catch(e=>{
            console.log(e.response.data)
            message.error('Error '+e);
        })
    }
    apagarModal=()=>{
        this.setState({
            modal: false
        })
    }
    encenderModal=()=>{
        //this.getEmpresa(this.state.empresa_id)
        this.setState({
            modal: true
        })
    }
    render() {
        return (
            <div>
                <Button  style={{backgroundColor:'#1E1E2F', color:'#ffffff', border:"#ffffff", marginTop:'15px', width:'26vh'}}
                         onClick={this.encenderModal}
                         title="Editar imegen de perfil"
                >
                    <PictureOutlined /> Editar Avatar
                </Button>
                <Modal
                    title="Editar imagen de perfil "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    onCancel={this.apagarModal}
                >
                    <input
                        type='file'
                        onChange={this.fileSelectedHandler}
                        ref={fileInput=>this.fileInput=fileInput}
                        accept="image/*"
                    />

                    <Button
                        onClick={this.fileUploadHandler}
                        size='default'
                        style={{background:'#1E1E2F', color:"#ffffff"}}
                    >
                        <UploadOutlined/> Subir foto
                    </Button>
                </Modal>
            </div>
        );
    }
}
