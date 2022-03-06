import {API} from "./services/API";
import axios from "axios";

export function login(email, password) {
        let urlAPI = API +'inicioSesion';
        const datos={
            email: email,
            password: password
        }
        try{
            const valor=axios.post(urlAPI,datos).then(response=>{
                return response
            }).catch(err=>{
                return err
            })
            return true
        }catch (e) {
          return false
        }
        /*axios.post(urlAPI,{
            email: 'admin@prueba.com',
            password: '123123'
        }).then(response=>{
            //console.log(response)
            return true
        }).catch(err=>{
            //console.log(err)
            return false
        })*/
}