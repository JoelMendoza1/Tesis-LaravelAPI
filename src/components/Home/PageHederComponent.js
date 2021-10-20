import React from "react";
import {Row, Col, Button, Popover } from "antd";
import {Header} from "antd/es/layout/layout";
import {BookOutlined, FacebookOutlined, InstagramOutlined} from "@ant-design/icons"
import Navigation from "./Navigation";
import '../../styles/app.css';
import Routes from "../../constants/routes";
import stylesNavigation from "../../styles/navigation.css";
import {NavLink} from "react-router-dom";
export default function PageHederComponent(){

    return(
        <div>
            <Row type='flex' justify='center' className='header-wrapper'>
                <Col span={ 20 }>
                    <Header>
                        <Row gutter={16} type='flex' justify='space-between' align='bottom'>
                            <Col className="gutter-row" span={6} >
                                <a>
                                    <BookOutlined />
                                </a>
                                <NavLink to={ Routes.HOME } activeClassName={stylesNavigation.active} exact>Home</NavLink>
                            </Col>
                            <Col className="gutter-row" span={6} >
                                <NavLink to={ Routes.HOME } activeClassName={stylesNavigation.active} exact>Home</NavLink>
                            </Col>
                            <Col className="gutter-row" span={6} >
                                <NavLink to={ Routes.HOME } activeClassName={stylesNavigation.active} exact>Home</NavLink>
                            </Col>
                            <Col xs={ 6} align='right' className='responsive-menu-button'>
                                <Popover content={ <Navigation mode='vertical' /> }
                                         trigger='click'
                                         placement='rightTop'
                                         overlayClassName='responsive-menu-wrapper'>
                                    <Button type='primary'>
                                        <svg viewBox='64 64 896 896'
                                             focusable='false'
                                             className=''
                                             data-icon='menu'
                                             width='1em'
                                             height='1em'
                                             fill='currentColor'
                                             aria-hidden='true'>
                                            <path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
                                        </svg>
                                    </Button>
                                </Popover>
                            </Col>
                            <Col xs={ 22 } md={ 4 } className='logos-social-header' align='right'>
                                <a href='https://www.facebook.com'
                                   target='_blank'
                                   rel='noopener noreferrer'
                                   style={ {
                                       marginLeft: 30,
                                       marginRight: 30
                                   } }>
                                    <FacebookOutlined />
                                </a>
                                <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
                                    <InstagramOutlined />
                                </a>
                            </Col>
                        </Row>
                    </Header>
                </Col>
            </Row>
        </div>
    );
}