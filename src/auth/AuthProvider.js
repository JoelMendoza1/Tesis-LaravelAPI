import {createContext, useEffect, useState} from "react";
import {API} from "../services/API";
import axios from "axios";

export const AuthContext =createContext();
const AuthProvider=({children})=>{
    const [user, setUser]= useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [usuario, setUsuario]=useState(null)
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user))
    },[user])

    useEffect(()=>{

        const token =localStorage.getItem('user')
        const t= token.replace(/['"]+/g, '')
        if(!t){
            console.log("No hay Token")
        }else{
            let url = API + 'usuarios';
            const config = {
                headers: { Authorization: `Bearer ${t}` }
            };
            axios.get(url, config).then(
                response=>{
                    console.log("Usuario encontrado",response)
                    setUsuario(response.data)
                }
            ).catch(e=>{
                if(e.response){
                    if(e.response.data.message==="token_not_refreshed"){
                        setUser(null)
                        localStorage.clear()
                    }
                    if(e.response.data.message==="token_expired"){
                        setUser(null)
                        localStorage.clear()
                    }
                    if(e.response.data.message==="token_invalid"){
                        setUser(null)
                        localStorage.clear()
                    }
                }else{
                    setUser(null)
                    localStorage.clear()
                }


            })
        }
    },[])

    const contextValue={
        user,
        login(response){
            setUser(response)
        },
        logout(){
            setUser(null)
        },
        isLogged(){
            return !!user
        },
        usuario
    }

    return(
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
    )
}
export default AuthProvider;