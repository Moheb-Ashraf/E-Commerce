import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logophoto from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../Context/User.Context";
import { CartContext } from "../Context/cart.Context";
function Navbar() {


    const {token,LogOut}=useContext(userContext);
    const {cartInfo,getProductFromCart}=useContext(CartContext);
    useEffect(()=>{
        getProductFromCart()
    },[])

    return <>
    <nav className="bg-slate-100 py-3 fixed right-0 left-0 shadow z-50">
    <div className="container max-md:flex-col max-md:items-center flex gap-5 ">
        <a href="/">
            <img src={logophoto} alt="logo" />
        </a>

{token && 
        <ul className="capitalize flex max-sm:flex-col items-center gap-3">
            <li><NavLink className={({isActive})=>{
                return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/">home</NavLink></li>
            <li><NavLink className={({isActive})=>{
                return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/cart">cart</NavLink></li>
            <li><NavLink className={({isActive})=>{
                return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/products">products</NavLink></li>
            <li><NavLink className={({isActive})=>{
                return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/categories">categories</NavLink></li>
            <li><NavLink className={({isActive})=>{
                return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/brands">brands</NavLink></li>
        </ul>

}
        <ul className="flex items-center gap-3 max-md:ml-0 ml-auto cursor-pointer">
            {token && <li className="pe-5 ">
                <Link to="/cart" className="relative text-lg">
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="bg-primary-500 top-0 right-0 rounded-full translate-x-1/2 -translate-y-1/2 h-5 w-5 text-white absolute flex justify-center items-center text-sm">
                {cartInfo==null?<i className="fa-solid fa-spinner fa-spin"></i>:<span>{cartInfo.numOfCartItems}</span>}
                </div>
                </Link> 
            </li>}
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-tiktok"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-linkedin"></i></li>
            <li><i className="fa-brands fa-youtube"></i></li>
        </ul>



        <ul className="capitalize flex items-center gap-3">
            {!token&&<li>
                <NavLink className={({isActive})=>{
                    return `relative before:absolute hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 before:bg-primary-500 ${isActive ? "before:!w-full font-semibold" : ""}`
                }} to="/signup">signup</NavLink>
            </li>}
            {!token&&<li>
                <NavLink className={({isActive})=>{
                    return `relative before:absolute hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 before:bg-primary-500 ${isActive ? "before:!w-full font-semibold" : ""}`
                }} to="/login">login</NavLink>
            </li>}
            
            {token && <li onClick={LogOut}>
                <NavLink className="font-semibold relative before:absolute hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 before:bg-primary-500" to="/exit">exit</NavLink>
            </li>}
        </ul>
    </div>
    </nav>
    </>
}
export default Navbar
