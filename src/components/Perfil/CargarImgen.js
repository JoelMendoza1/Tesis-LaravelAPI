import React, { Component } from 'react';
import {Button,message} from "antd";
import axios from "axios";
import {API} from "../../services/API";
import {CameraOutlined, UploadOutlined} from "@ant-design/icons";
export  default class CargarImgen extends Component{
    state ={
        selectedFile: null,
        nameFile: null
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
        let url = API + 'usersImagen/'+1;
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
        })
    }

    render() {
        return (
            <div>
                <input
                    style={{display:'none'}}
                    type='file'
                    onChange={this.fileSelectedHandler}
                    ref={fileInput=>this.fileInput=fileInput}
                    accept="image/*"
                />
                <Button
                    style={{background:'#55556D', color:"#ffffff"}}
                    icon={<UploadOutlined/>}
                    title="Cargar imagen"
                    onClick={()=>this.fileInput.click()}
                />
                <Button
                    onClick={this.fileUploadHandler}
                    size='default'
                    style={{background:'#1E1E2F', color:"#ffffff"}}
                >
                    <CameraOutlined/> Subir foto
                </Button>
            </div>
        );
    }
}
