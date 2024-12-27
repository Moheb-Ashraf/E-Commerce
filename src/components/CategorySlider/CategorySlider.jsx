import axios from "axios";
import { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Loading from "../Loading/Loading";

import 'swiper/css';
import 'swiper/css/autoplay';



function CategorySlider() {

    const [categories, setcategories] = useState(null);

    async function getCategories() {
        const option={
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET"
        };

        let {data}=await axios.request(option);
        
        setcategories(data.data)
        
    }

    useEffect(()=>{
        getCategories()
    },[])


    return <>
    <section className="mb-8">
        <h2 className="py-5 capitalize font-bold">Shop popular categories</h2>
    {!categories ? <Loading/> : <Swiper 
    breakpoints={{
        640: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 6,
            spaceBetween: 15,
        },
    }}

     autoplay={{delay:1000}} modules={[Autoplay]}  loop={true}>
        {categories.map((category) => <SwiperSlide key={category._id}>

            <div className="h-64">
            <img className="w-full h-full object-cover" src={category.image} alt="" />
            </div>
            <h3>{category.name}</h3>

        </SwiperSlide>)}
        </Swiper>}
    </section>
    </>
}

export default CategorySlider
