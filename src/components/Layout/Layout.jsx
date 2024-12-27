
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navebar/Navbar'

function Layout() {
    return <>
    <Navbar/> 
    <div className="container max-md:pt-52 max-sm:pt-[350px] p-12 pt-16 pb-10">
    <Outlet>
    </Outlet>
    </div>
    <Footer/>
    </>
}

export default Layout
