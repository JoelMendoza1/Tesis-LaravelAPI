import {createContext, useEffect, useState} from "react";

export const AuthContext =createContext();

const AuthProvider=({children})=>{
    const [user, setUser]= useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [token, setToken]= useState(
        JSON.parse(localStorage.getItem("token"))||null
    );
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user))
    },[user])

    useEffect(()=>{
        localStorage.setItem("token", JSON.stringify(user))
    },[token])

    const contextValue={
        user,
        login(response){
            setUser(response)
        },
        logout(){
            setUser(null)
            setToken(null)
        },
        isLogged(){
            return !!user
        }
    }

    return(
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
    )
}
export default AuthProvider;