import React from "react";
import {Card, message, Progress, Typography} from "antd";
import {API} from "../../services/API";
import axios from "axios";
const {Text}=Typography;
export default class  GetIdiomas extends React.Component{
    constructor(props) {
        super(props);
        this.state =({
            idiomas: [],
            id: props.id
        })
    }
    componentDidMount(){
        this.getIdioma(this.state.id)
    }
    getIdioma= async (id) => {
        let url = API + 'users/'+id+'/idiomas';
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
                    idiomas:response.data
                })
            }
        ).catch(
            e=>{
                console.log(e.message)
                message.error("Usuario no encontrado!")
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
                {this.state.idiomas.map((value, index) =>
                    <Card
                        key={index}
                        title={value.idioma}
                        style={{background:'#55556D', margin:'10px'}}
                    >
                        <Progress
                            type="circle"
                            percent={value.nivel}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#1E1E2F',
                            }}
                            width={90}
                            style={{margin:'20px'}}
                        />
                        <Text level={5}> Dominio</Text>
                    </Card>
                )}
            </div>
        )
    }
}