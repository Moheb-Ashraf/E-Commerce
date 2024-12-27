import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  async function displayData() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };

      let { data } = await axios.request(options);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    displayData();
  }, []);

  return (
    <>
      <div className="flex">
        <input
          onChange={(input) => setSearchTerm(input.target.value)}
          type="text"
          placeholder="Search"
          className="InputForm grow my-16 shadow-xl"
        />
      </div>

      {!products ? (
        <Loading />
      ) : filteredProducts.length > 0 ? (
        <div className="border-2 border-primary-500 rounded-lg p-4 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} productInfo={product} />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </>
  );
}

export default Home;
