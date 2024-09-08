import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { categories, products } from "../data";
import CategoryBubble from "./CategoryBubble";
import Product from "./Product";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const searchHandler = () => {
    // Check if searchTerm is not empty
    if (searchTerm.trim()) {
      const filteredArray = products.filter((prod) => {
        const matches = prod.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        // console.log("Checking product:", prod.title, matches);
        return matches; // Ensure the condition is returning true or false
      });

      // INFO:
      // for debugging
      // console.log("Filtered products:", filteredArray);

      setFilteredProducts(filteredArray.length > 0 ? filteredArray : products);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-10">
        {/* TODO:
            [] Turn it to components
        */}
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
          <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded"></div>
          <input
            type="text"
            placeholder="Search product"
            className="bg-transparent outline-0"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              searchHandler();
            }}
          />
          <button onClick={searchHandler}>
            <CiSearch />
          </button>
        </div>

        <div className="categories w-full flex justify-between px-5 py-10">
          {categories.map((cat) => (
            <CategoryBubble data={cat} key={cat.id} />
          ))}
        </div>

        <div className="products grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20">
          {filteredProducts &&
            filteredProducts.map((prod) => (
              <Product data={prod} key={prod.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
