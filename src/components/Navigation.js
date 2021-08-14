import React from "react";
import {NavLink} from "react-router-dom";
import {Button, Menu} from "antd";
import Routes from "../constants/routes";
import stylesNavigation from "../styles/navigation.css"
import {GithubOutlined, FacebookOutlined} from '@ant-design/icons';

export default function Navigation(){

    return(
        <div>
            <Menu mode="horizontal"  className={stylesNavigation.menu}>
                <Menu.Item key={Routes.HOME}>
                    <NavLink to={ Routes.HOME } style={{color:'#ffffff'}} exact>Principal</NavLink>
                </Menu.Item>
                <Menu.Item key={Routes.ABOUT}>
                    <NavLink to={ Routes.ABOUT} style={{color:'#ffffff'}} exact>Acerca</NavLink>
                </Menu.Item>
                <Menu.Item key={Routes.CONTACT}>
                    <NavLink to={ Routes.CONTACT } style={{color:'#ffffff'}} exact>Contactos</NavLink>
                </Menu.Item>

                <Menu.Item key={Routes.REGISTER}>
                    <NavLink to={ Routes.REGISTER } style={{color:'#ffffff'}} exact>Registrate</NavLink>
                </Menu.Item>



                <Menu.Item key={Routes.LOGIN} style={{paddingLeft:'300px'}}>
                    <Button style={{backgroundColor:'#292F36', color:'#ffffff'}}>
                        <NavLink to={ Routes.LOGIN } className={stylesNavigation.active} exact>Iniciar Sesión</NavLink>
                    </Button>
                </Menu.Item>

                <Menu.Item>
                        <a href="https://github.com/joelMendoza1" target="_blank" style={{color:'#ffffff'}}> <GithubOutlined /></a>
                </Menu.Item>
                <Menu.Item style={{float: 'right'}}>
                    <a href="https://www.facebook.com/" target="_blank" style={{color:'#ffffff'}}> <FacebookOutlined /></a>

                </Menu.Item>

            </Menu>
        </div>
    )
}