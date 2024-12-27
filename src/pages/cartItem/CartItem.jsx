import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/Context/cart.Context";


function CartItem({ productInfo }) {

    let{removeProduct,updateCount}=useContext(CartContext);

    const { count, price, product } = productInfo;
    const { title, category, imageCover, id } = product;
    return <>
        <div className="flex gap-1">
            <div className="flex grow justify-between bg-slate-100 items-center rounded-xl px-4">
                <img
                    src={imageCover}
                    alt={title}
                    className="w-24 h-24 object-cover rounded-full m-5 border border-white border-solid"
                />
                <Link to={`/product/${id}`} className="capitalize font-semibold truncate w-44 cursor-pointer">{title}</Link>
                <h3 className="text-primary-600">{category.name}</h3>
                <div className="count flex justify-items-center items-center gap-2">
                    <span>{count}</span>
                    <div>
                        <div onClick={()=>{
                            updateCount({productId:id,count:count+1})
                        }} className="border w-6 h-6 border-solid rounded-lg bg-primary-700 text-center text-white cursor-pointer">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div 
                         onClick={()=>{
                            updateCount({productId:id,count:count-1})
                        }}
                        className="border w-6 h-6 border-solid rounded-lg bg-primary-700 text-center text-white cursor-pointer">
                            <i className="fa-solid fa-minus"></i>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1">
                    {price}
                    <span>L.E</span>
                </div>
            </div>
            <button
            onClick={()=>{
                removeProduct({productId:id})
            }}
                className="bg-slate-100 text-center px-1 rounded-xl hover:bg-slate-500 transition-colors duration-100 text-primary-900">
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>

    </>
}

export default CartItem
