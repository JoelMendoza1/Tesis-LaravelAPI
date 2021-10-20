import React from "react";
import {Button,  Typography} from "antd";
import { Carousel } from 'antd';
import '../../styles/about.css';
import {NavLink} from "react-router-dom";
import Routes from "../../constants/routes";

const { Title } = Typography;

export default function About(){

    return(
        <div className='about-carrusel'>
            <div>
                <Title level={3} style={{color: '#ffffff'}}> ¿CÓMO FUNCIONA SI SOY PASANTE?</Title>
                        <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px', marginBottom:'40px'}}>
                            <NavLink to={ Routes.REGISTER } className='active' exact>VER OFERTAS COMO INVITADO</NavLink>
                        </Button>
                        <Carousel autoplay>
                            <div className="carrusel-n1">
                                <div className="carrusel-contenido">
                                    <h1>1</h1>
                                    <h1>LLENA EL FORMULARIO DE REGISTRO</h1>
                                    <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                        <NavLink to={ Routes.REGISTER } className='active' exact>Registrate!!</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="carrusel-n2">
                                <div className="carrusel-contenido">
                                    <h1>2</h1>
                                    <h1>COMPLETA TÚ CURRICULUM PROFESIONAL</h1>
                                    <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                        <NavLink to={ Routes.REGISTER } className='active' exact>Registrate!!</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="carrusel-n3">
                                <div className="carrusel-contenido">
                                    <h1>3</h1>
                                    <h1>RECIBE LAS MEJORES OFERTAS</h1>
                                    <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                        <NavLink to={ Routes.REGISTER } className='active' exact>Registrate!!</NavLink>
                                    </Button>
                                </div>
                            </div>

                        </Carousel>
            </div>
            <div className='about-carrusel'>
                <Title level={3} style={{color: '#ffffff'}}> ¿CÓMO FUNCIONA SI SOY UN EMPRESARIO?</Title>

                        <Carousel autoplay>
                            <div className="carrusel-n4">
                                <div className="carrusel-contenido">
                                    <h1>1</h1>
                                    <h1>LLENA EL FORMULARIO DE REGISTRO</h1>
                                    <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                        <NavLink to={ Routes.REGISTER } className='active' exact>Registrate!!</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="carrusel-n5">
                                <div className="carrusel-contenido">
                                    <h1>2</h1>
                                    <h1>COMPLETA LOS DATOS DE TU EMPRESA</h1>
                                    <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                        <NavLink to={ Routes.REGISTER } className='active' exact>Registrate!!</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="carrusel-n6">
                                <div className="carrusel-contenido">
                                    <h1>3</h1>
                                    <h1>ENVIA OFERTAS</h1>
                                    <Button style={{backgroundColor:'#292F36', color:'#ffffff', marginTop: '30px'}}>
                                        <NavLink to={ Routes.REGISTER } className='active' exact>Registrate!!</NavLink>
                                    </Button>
                                </div>
                            </div>
                        </Carousel>
            </div>
        </div>
    )
}