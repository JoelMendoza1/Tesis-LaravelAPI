import React, { Component } from 'react';
import {Alert, Button, message, Modal} from "antd";
import axios from "axios";
import {API} from "../../services/API";
import {FileOutlined, UploadOutlined} from "@ant-design/icons";
export  default class ModalEditarDocumento extends Component{
    constructor(props) {
        super(props);
        this.state =({
            selectedFile: null,
            nameFile: null,
            id: this.props.id,
            request:this.props.request,
            description: this.props.description,
            typeUser: this.props.typeUser,
            tipoUsuario: ''
        })
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
        let url = API + 'usersDocument/'+this.state.id;
        const token =localStorage.getItem('token')
        const t= token.replace(/['"]+/g, '')
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        const fd =new FormData();
        fd.append('document', this.state.selectedFile);

        //console.log(this.state.selectedFile)
        axios.post(url,fd,config).then(res=>{
            console.log(res);
            //this.apagarModal()
            //PerfilesPage.getUser()
            message.success('Documento actualizado')
            window.location.reload();
        }).catch(e=>{
            console.log(e.response)
            message.error('Error documento no cargado ');
        })
    }
    apagarModal=()=>{
        this.setState({
            modal: false
        })
    }
    componentDidMount() {
        this.PasanteOrEmpresa()
    }

    encenderModal=()=>{
        //this.getEmpresa(this.state.empresa_id)
        this.setState({
            modal: true
        })
    }
    PasanteOrEmpresa(){
        if(this.state.typeUser==='P'){
            this.setState({
                tipoUsuario: 'Curriculum'
            })
        }else if(this.state.typeUser==='E'){
            this.setState({
                tipoUsuario: 'RUC'
            })
        }

    }
    render() {
        return (
            <div>
                {
                    (this.state.request===null|| this.state.request===0) ?
                        <Button
                            danger
                            onClick={this.encenderModal}
                            style={{ marginTop:'15px', width:'26vh'}}
                            icon={<FileOutlined/>}
                            title={'Edita el documento de tú '+this.state.tipoUsuario}
                        >
                            Editar {this.state.tipoUsuario}
                        </Button>
                        : <></>
                }
                <Modal
                    title="Editar documento "
                    visible={this.state.modal}
                    footer={[
                        <Button key="back" style={{background:'#1E1E2F', color:'#ffffff'}} onClick={this.apagarModal}>
                            Cancelar
                        </Button>
                    ]}
                    width={700}
                    onCancel={this.apagarModal}
                >

                    <input
                        type='file'
                        onChange={this.fileSelectedHandler}
                        ref={fileInput=>this.fileInput=fileInput}
                        accept=".pdf"
                        style={{width:'300px'}}
                    />
                    <br/>
                    <br/>
                    <Button
                        onClick={this.fileUploadHandler}
                        size='default'
                        style={{background:'#1E1E2F', color:"#ffffff"}}
                    >
                        <UploadOutlined/> Subir documento
                    </Button>
                    <br/>
                    <label>Cargar un límite de 2MB</label>
                </Modal>
            </div>
        );
    }
}
