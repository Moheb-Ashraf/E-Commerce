import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../components/Context/cart.Context"
import Loading from "../../components/Loading/Loading"
import CartItem from "../cartItem/CartItem"


function Cart() {

    let{clear}=useContext(CartContext)

    let { getProductFromCart, cartInfo } = useContext(CartContext)


    useEffect(() => {
        getProductFromCart()
    }, [])
    return <>
        {
            cartInfo == null ? <Loading /> : <section>
                <h2 className="text-xl font-semibold space-x-2 mb-3">
                    <i className="fa-brands fa-opencart text-primary-300"></i>
                    <span>|</span> your shopping cart :</h2>
                {cartInfo.numOfCartItems == 0 ? 
                <div className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col gap-3">
                    <h2>your cart is empty </h2>
                    <Link to="/" className="btn">back to home </Link> 
                </div> :
                    <>
                        <div className="space-y-2">
                            {cartInfo.data.products.map((product) => <CartItem key={product._id} productInfo={product} />)}
                        </div>
                        <div className="my-4 flex justify-between">
                            <p className="text-xl"><i className="fa-solid fa-sack-dollar text-primary-400"></i> total money is <span className="text-primary-600">{cartInfo.data.totalCartPrice
                            }</span></p>

                            <Link className="btn " to="/checkout"> Payment</Link>

                            <button onClick={clear} className="btn bg-red-600 hover:bg-red-800">delete</button>
                        </div>
                    </>
                }
            </section>
        }
    </>
}

export default Cart
