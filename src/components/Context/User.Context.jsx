import { createContext, useState } from "react";

export const userContext=createContext(null);

export default function UserProvider({children}){

    function LogOut(){
        setToken(null);
        localStorage.removeItem("token");
    }

    const [token , setToken]=useState(localStorage.getItem("token"));

    return <userContext.Provider value={{token,setToken,LogOut}}>
{children}
    </userContext.Provider>
}