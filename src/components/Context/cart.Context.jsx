import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "./User.Context";

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const { token } = useContext(userContext);
    const [cartInfo, setCartInfo] = useState(null);

     async function addProductToCart({productId}) {

        let toastid=toast.loading("adding product ....")

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data:{
                    productId
                }
            }
    
            let {data} =await  axios.request(options);
            if(data.status=="success"){
                toast.success(data.message)
                getProductFromCart()
            }
            
        } catch (error) {
            toast.error(error)
            
        }
        finally{
            toast.dismiss(toastid)
        }
    }

    async function getProductFromCart(){
        try {
            const options={
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"GET",
                headers:{
                    token
                }
            }
            let {data}=await axios.request(options);
            setCartInfo(data);
            
            
        } catch (error) {
            
            
        }
        
    }

    async function removeProduct({productId}){
        let toastid=toast.loading("wait for remove..")
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"DELETE",
                headers:{
                    token
                }
            }
            let {data}=await axios.request(options);
            if(data.status=="success"){
                toast.success(data.status)
                setCartInfo(data)
            }
            
        } catch (error) {
            toast.error("error")
            
            
        }finally{
            toast.dismiss(toastid)
        }

    }

    async function clear(){
        let toastid=toast.loading("clear cart .....")
        try {
            const options={
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"DELETE",
                headers:{
                    token
                }
            }
            let {data}=await axios.request(options);
            if(data.message=="success"){
                toast.success("cart is empty ")
                setCartInfo({numOfCartItems:0})
            }
            
        } catch (error) {
            console.log(error);
            
        }finally{
            toast.dismiss(toastid)
        }
    }

    async function updateCount({productId,count}){
       try {
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method:"PUT",
            headers:{
                token
            },
            data:{
                count
            }
        }

        let {data}=await axios.request(options);
        if(data.status=="success"){
            setCartInfo(data)
        }
        
       } catch (error) {
        console.log(error);
        
       }
    }

    return <CartContext.Provider value={{ addProductToCart,getProductFromCart,cartInfo,removeProduct,clear,updateCount }}>
        {
            children
        }
    </CartContext.Provider>
}