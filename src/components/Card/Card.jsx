import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/cart.Context";


function Card({productInfo}) {
    const {title,description,price,imageCover,category,ratingsAverage,id} =productInfo;
    let {addProductToCart}=useContext(CartContext)
    return <>

        <div className=" card group/card rounded-lg overflow-hidden shadow-lg space-y-2">
            <div className="relative">
                <img className="w-full" src={imageCover} alt="" />
                <div className="bg-slate-400 absolute group-hover/card:opacity-100 transition-opacity duration-300 w-full h-full left-0 top-0 flex justify-center items-center gap-3 opacity-0 bg-opacity-45">
                    <div className="icon cursor-pointer bg-primary-400 rounded-full flex justify-center items-center w-8 h-8 text-white">
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    <div onClick={()=>{
                        addProductToCart({productId:id})
                    }} className="icon cursor-pointer bg-primary-400 rounded-full flex justify-center items-center w-8 h-8 text-white">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <Link to={`/product/${id}`} className="icon cursor-pointer bg-primary-400 rounded-full flex justify-center items-center w-8 h-8 text-white">
                        <i className="fa-solid fa-eye"></i>
                    </Link>
                </div>
            </div>
            <div className="p-3 space-y-2">
                <p className="text-primary-600 capitalize text-sm"> {category.name}</p>
                <h3 className="font-semibold capitalize text-xl line-clamp-1"> <Link to={`/product/${id}`}>{title}</Link></h3>
                <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
                <div className="flex justify-between pt-3 text-sm">
                    <span>{price} EGP</span>
                    <div className="flex justify-center items-center space-x-1">
                        <i className="fa-solid fa-star text-yellow-300"></i>
                        <span>{ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Card
