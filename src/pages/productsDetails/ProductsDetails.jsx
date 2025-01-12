import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/Card/Card";
import { CartContext } from "../../components/Context/cart.Context";
import Loading from "../../components/Loading/Loading";

import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

function ProductsDetails() {

    let { addProductToCart } = useContext(CartContext);

    let [productDetails, setProductDetails] = useState(null);
    let [relatedProductsCategory, setrelatedProductsCategory] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        getProductDetails()
    }, [])

    async function getProductDetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: "GET",
            }

            let { data } = await axios.request(options);
            setProductDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function relatedProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: "GET"
            }
            let {data} = await axios.request(options);
            setrelatedProductsCategory(data.data)
            
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(()=>{
        if(productDetails==null)return;
        relatedProducts()
    },[productDetails]);

    return <>
        {productDetails ?
        <>
        <section>
            <div className="grid grid-cols-12 md:gap-10 xl:gap-20 lg:gap-20 p-10">
                <div className="min-[0px]:col-span-12 min-[0px]:gap-0 sm:col-span-12 md:col-span-6  lg:col-span-6 xl:col-span-3 ">

                    <ReactImageGallery showNav={false} showPlayButton={false} autoPlay={true} items={productDetails.images.map((image) => {
                        return {
                            original: image,
                            thumbnail: image
                        }
                    })} />

                </div>
                <div className="min-[0px]:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-9 flex flex-col py-14">
                    <h2 className="font-bold text-2xl text-gray-800 pb-1">{productDetails.title}</h2>
                    <h2 className=" text-sm font-semibold px-2 text-primary-500 pb-4">{productDetails.category.name}</h2>
                    <p className="py-2 text-gray-700 text-lg">{productDetails.description}</p>
                    <div className="flex justify-between items-center py-3 ">
                        <div className="flex justify-center items-center gap-1">
                            {productDetails.price}
                            <span className="font-semibold">EGP</span>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            {productDetails.ratingsAverage}
                            <i className="fa-solid fa-star text-yellow-400"></i>
                        </div>
                    </div>
                    <button onClick={() => {
                        addProductToCart({ productId: id }), []
                    }} className="btn font-bold">Add to cart</button>
                </div>
            </div>
        </section>
        <section>
            <h2 className="font-bold">Related Products</h2>
            {
                relatedProductsCategory? <Swiper

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
                modules={[Autoplay]}  autoplay={{delay:3000}} loop={true} spaceBetween={10} className="p-4">
                    {
                        relatedProductsCategory.map((product=> <SwiperSlide key={product.id}>
                            <Card productInfo={product}/>
                        </SwiperSlide>))
                    }
                </Swiper> : <Loading/>
            }
        </section>
        </> : <Loading />}
    </>
}

export default ProductsDetails
