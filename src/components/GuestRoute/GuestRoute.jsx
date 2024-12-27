import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../Context/User.Context";


function GuestRoute( {children}) {

    let {token}=useContext(userContext);
    if(!token){
        return children;
    }
    else{
       return <Navigate to="/" />
    }
}

export default GuestRoute
