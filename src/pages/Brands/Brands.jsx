import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";


function Brands() {


    let [brands,setBrands]=useState(null);

    useEffect(()=>{
        getBrands()
    })

    async function getBrands(){

        try {
            const options={
                url: "https://ecommerce.routemisr.com/api/v1/brands",
                method:"GET"
            }
    
            let {data}=await axios.request(options);
            setBrands(data.data)
        } catch (error) {
            console.log(error);
            
        }
        

    }



    return <>
        {brands?
    <div>
        <h2 className="font-bold text-4xl text-primary-500 text-center py-4">All Brands</h2>
        <div className="grid sm:grid-cols-1 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands.map((brand)=>
            <div key={brand._id} className="text-center border-2 hover:shadow-xl hover:shadow-primary-400 border-primary-400 rounded-lg overflow-hidden my-5">
            <img src={brand.image} alt="" className="w-full" />
            <h2 className="font-semibold text-xl py-3 capitalize">
                {brand.name}
            </h2>
        </div>
        )}
    </div>
    </div>
        :<Loading/>}
    
    </>
}

export default Brands
