import React, {useState} from "react";
import {API} from "../services/API";
import axios from "axios";

 const AutenticateUser = async () => {
    const {user, setUser}= useState(()=>{
        try{
            let url = API + 'usuarios';
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
                    setUser(response.data)
                }
            ).catch(
                e=>{
                    setUser(e.response)
                    //return e.response.data.message
                }
            )
        }catch(e){
            setUser(e.message)
            //return e.message
        }
    });
    return{
        user: user
    }
}
export default AutenticateUser