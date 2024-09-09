import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { categories } from "../data"; // Assuming categories is static
import CategoryBubble from "./CategoryBubble";
import Product from "./Product";
import axios from "axios";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // Store all products fetched from the backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Store the filtered list
  const [visibleCount, setVisibleCount] = useState(5); // Number of products to show initially

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data); // Set products state with the fetched data
        setFilteredProducts(res.data); // Initially set filteredProducts to all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle the search functionality
  const searchHandler = () => {
    if (searchTerm.trim()) {
      const filteredArray = products.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredArray.length > 0 ? filteredArray : products);
    } else {
      setFilteredProducts(products); // Reset to all products if search is cleared
    }
  };

  // Load more products
  const loadMoreHandler = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Increase the visible count by 5
  };

  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-10">
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
          <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded">
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
        </div>

        <div className="categories bg-white w-full flex justify-between space-x-8 px-5 py-10">
          {categories.map((cat) => (
            <CategoryBubble data={cat} key={cat.id} />
          ))}
        </div>

        <div className="products grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20">
          {filteredProducts &&
            filteredProducts
              .slice(0, visibleCount)
              .map((prod) => <Product data={prod} key={prod._id} />)}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 bg-black text-white rounded-lg hover:drop-shadow-lg hover:scale-[110%] transition-all hover:font-bold ease-out"
              onClick={loadMoreHandler}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
