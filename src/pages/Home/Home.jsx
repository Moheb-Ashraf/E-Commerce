import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Loading from "../../components/Loading/Loading";

function Home() {

    const [products , setProducts]=useState(null)

    async function displayData(){
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/products",
            method:"GET"
        }

        let {data}=await axios.request(options);
        setProducts(data.data);
        
    }

    useEffect(()=>{
        displayData()
    },[])

    return <>

    <HomeSlider/>
    <CategorySlider/>

        {!products ? <Loading/> : (<div className='grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {products.map((product)=> <Card key={product.id} productInfo={product}/> )}
        </div>)}
    </>
}

export default Home
