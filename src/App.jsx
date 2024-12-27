import { Toaster } from "react-hot-toast"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CartProvider from "./components/Context/cart.Context"
import UserProvider from "./components/Context/User.Context"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Brands from "./pages/Brands/Brands"
import Cart from "./pages/cart/Cart"
import Categories from "./pages/Categories/Categories"
import CheckOut from "./pages/CheckOut/CheckOut"
import ConfirmCode from "./pages/ForgetPassword/confirmCode"
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Orders from "./pages/Orders/Orders"
import Products from "./pages/Products/Products"
import ProductsDetails from "./pages/productsDetails/ProductsDetails"
import Resetpassword from "./pages/ResetPassword/Resetpassword"
import Signup from "./pages/Signup/Signup"



function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: (<ProtectedRoute><Layout /></ProtectedRoute>), children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products/> },
        { path: "product/:id", element: <ProductsDetails /> },
        { path: "checkout", element: <CheckOut /> },
        { path: "allorders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
      ]
    },
    {
      path: "/",
      element: (<GuestRoute><Layout /></GuestRoute>),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/forgetpassword", element: <ForgetPassword /> },
        { path: "/verifycode", element: <ConfirmCode /> },
        { path: "/reset", element: <Resetpassword /> },
      ]
    }
  ])
  return <>
    <UserProvider>
      <CartProvider>
      <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
    <Toaster />
  </>
}

export default App

