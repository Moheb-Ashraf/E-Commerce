import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";


function Categories() {

    let [selectedCategory, setSelectedCategory] = useState(null);

    let [categories, setCategories] = useState(null);
    let [categorylist, setCategorylist] = useState(null);

    useEffect(() => {
        getCategories()
    }, [])
    
    useEffect(() => {
        if (categorylist) {
            const section = document.getElementById("target-section");
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [categorylist]);


    async function getCategories() {

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET"
            }
            let { data } = await axios.request(options);
            setCategories(data.data);

        } catch (error) {
            console.log(error);

        }
    }

    async function categoryList(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
                method: "GET"
            }

            let { data } = await axios.request(options);
            setCategorylist(data.data)
        } catch (error) {
            console.log(error);

        }

    }


    return <>
        {categories ? <div>
            <div className="grid sm:grid-cols-1 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {categories.map((category) => <div key={category._id} 
                onClick={() => {
                    setSelectedCategory(category.name);
                    categoryList(category._id);
                }} 
                className="text-center border-2 hover:shadow-md hover:shadow-primary-400 border-primary-400 rounded-lg overflow-hidden my-5">
                    <img src={category.image} alt="" className="w-full max-h-80 object-cover" />
                    <h2 className="font-semibold text-xl py-3 capitalize">
                        {category.name}
                    </h2>
                </div>)}
            </div>

            {
                categorylist ? <div className="mt-6">
                    <h2 id="target-section" className="text-center text-4xl text-primary-500 font-bold">{selectedCategory} subcategories</h2>
                    <div className="grid sm:grid-cols-1 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-6">
                        {categorylist.map((categoryl) => <div key={categoryl._id}>
                            <div className="border-2 border-primary-400 rounded-lg p-3">
                                <h3 className="text-2xl text-gray-950 font-semibold text-center line-clamp-1">{categoryl.name}</h3>
                            </div>
                        </div>)}
                    </div>
                </div> : <div></div>
            }
        </div> : <Loading />}


    </>
}

export default Categories
