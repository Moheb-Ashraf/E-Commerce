import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../components/Context/cart.Context";
import { userContext } from "../../components/Context/User.Context";


function CheckOut() {

    let {cartInfo}=useContext(CartContext);
    let {token}=useContext(userContext);
    const navigate=useNavigate()

    let [methodPayment,setMethodPayment]=useState(null);

    async function createCashOrder(values){

        let toastId=toast.loading("loading......")
        try {

            const options={
                url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method:"POST",
                headers:{
                    token
                },
                data:values
            };
    
            let{data}=await axios.request(options);
            if(data.status=="success"){
                toast.success("order is completed")
                setTimeout(()=>{
                    navigate("/allorders")
                },2000)
            }
            
        } catch (error) {
            console.log(error);
            toast.error("check your products")
            
        }finally{
            toast.dismiss(toastId);
        }

    }

    async function createOnlineOrder(values) {
        let toastId= toast.loading("wait....");
        try {
            const options ={
                url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method:"POST",
                headers:{
                    token
                },
                data:values,
            }
            let{data}=await axios.request(options);
            if(data.status=="success"){
                toast.success("you will go to stripe");
                setTimeout(()=>{
                    location.href= data.session.url
                },2000)
            }
        } catch (error) {
            console.log(error);
            
        }
        finally{
            toast.dismiss(toastId)
        }
        
    }

    const formik = useFormik({
        initialValues: {
            "shippingAddress": {
                details: "",
                phone: "",
                city: ""
            }
        },
        onSubmit:(values)=>{
            if(methodPayment == "cash"){
                createCashOrder(values);
            }
            else{
                createOnlineOrder(values)
            }
        },
    })


    return <>
        <div>
            <h2 className="font-bold text-xl text-gray-700 pt-5">Shipping Address</h2>
            <form action="" className=" mt-4" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col py-2 ">
                    <input className="InputForm grow " type="text" value={formik.values.shippingAddress.city} onChange={formik.handleChange} name="shippingAddress.city" placeholder="City" />
                </div>
                <div className="flex flex-col py-2">
                    <input className="InputForm grow " type="tel" value={formik.values.shippingAddress.phone} onChange={formik.handleChange} name="shippingAddress.phone" placeholder="Phone" />
                </div>
                <div className="flex flex-col py-2">
                    <textarea className="InputForm grow " name="shippingAddress.details" value={formik.values.shippingAddress.details} onChange={formik.handleChange}  placeholder="Details" id=""></textarea>
                </div>
                
                    <button type="submit" onClick={()=>{
                        setMethodPayment("cash")
                    }} className="btn m-3 bg-blue-600 hover:bg-blue-800">Cash Order</button>
                    <button type="submit" onClick={()=>{
                        setMethodPayment("online")
                    }} className="btn m-3 bg-green-500 hover:bg-green-700">Online Payment</button>
                
            </form>
        </div>

    </>
}

export default CheckOut
