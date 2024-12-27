import SliderImg1 from "../../assets/images/slider-image-1.jpeg";
import SliderImg2 from "../../assets/images/slider-image-2.jpeg";
import SliderImg3 from "../../assets/images/slider-image-3.jpeg";

import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
function HomeSlider() {


    return <>
    <section className="grid grid-cols-12 mb-8">
        <div className="col-span-8">
            <Swiper autoplay={{delay:2000 }} modules={[Autoplay]} slidesPerView={1} loop={true} className="h-full">
                <SwiperSlide >
                <img className="w-full h-full object-cover" src={SliderImg3} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                <img className="w-full h-full object-cover" src={SliderImg3} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                <img className="w-full h-full object-cover" src={SliderImg3} alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
        <div className="col-span-4">
            <img className="w-full" src={SliderImg1} alt="" />
            <img className="w-full" src={SliderImg2} alt="" />
        </div>
    </section>
    </>
}

export default HomeSlider
