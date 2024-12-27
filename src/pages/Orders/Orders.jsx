import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../components/Context/User.Context";
import Loading from "../../components/Loading/Loading";


function Orders() {

    let [orders,setOrders]=useState(null);
    const {token} = useContext(userContext);

    const {id} = jwtDecode(token);
    

    useEffect(()=>{
        getUserOrders()
    },[])

    async function getUserOrders(){
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method:"GET",
            }
    
            let{data}=await axios.request(options);
            setOrders(data);
        } catch (error) {
            console.log(error);
            
        }
        
    }



    return <>
        {orders?<div className="space-y-3">
            {orders.map((order)=><div key={order.id} className="border-2 border-gray-500 border-opacity-25 rounded-lg p-4">
            <div className="flex justify-between items-center ">
                <div>
                    <h2 className="text-gray-500">
                        order id
                    </h2>
                    <div className="font-semibold text-lg text-gray-700">
                        #{order.id}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    {order.isPaid ? <Link className="btn bg-lime-600 hover:bg-lime-600"> مدفوع </Link>:
                    <Link className="btn bg-red-600 hover:bg-red-600">غير مدفوع </Link>}
                    {order.isDelivered ? <Link className="btn bg-primary-600 hover:bg-primary-600">تم التوصيل  </Link>:<Link className="btn bg-blue-600 hover:bg-blue-600">قيد التوصيل  </Link>}
                </div>
            </div>
            <div className="grid sm:gap-2 sm:grid-cols-1 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 py-4">
                {order.cartItems.map((product)=><div key={product._id} className="border-2 border-primary-300 shadow-lg rounded-lg overflow-hidden ">
                    <img className="w-full" src={product.product.imageCover} alt="" />
                    <div className="p-3">
                    <h3 className="line-clamp-1 text-xl font-bold">
                        <Link to={`/product/${product.product.id}`}>{product.product.title}</Link>
                    </h3>
                    <div className="flex justify-between items-center">
                        <p>
                            <span className="underline font-semibold">count :</span> {product.count}
                        </p>
                        <span className="font-semibold">{product.price} L.E</span>
                    </div>
                    </div>
                </div>)}
            </div>

            <p>Total price is <span className="text-primary-600 text-xl">{order.totalOrderPrice}</span> L.E</p>
            <div>

            </div>
        </div>)}
        </div> : <Loading/>}

    </>
}
export default Orders
