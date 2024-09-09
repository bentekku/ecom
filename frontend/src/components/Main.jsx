import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { categories, colors, filters } from "../data"; // Assuming categories is static
import CategoryBubble from "./CategoryBubble";
import Product from "./Product";
import axios from "axios";
import "../index.css";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState(""); // Add state for selected color
  const [selectedFilter, setSelectedFilter] = useState("default"); // Add state for selected filter

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search, category, and color filtering
  useEffect(() => {
    let updatedProducts = products;

    if (searchTerm.trim()) {
      updatedProducts = updatedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (prod) => prod.category.toLowerCase() === activeCategory
      );
    }

    if (selectedColor) {
      updatedProducts = updatedProducts.filter((prod) => {
        // Ensure color is a string before using toLowerCase
        const prodColor =
          typeof prod.color === "string" ? prod.color.toLowerCase() : "";
        return prodColor === selectedColor.toLowerCase();
      });
    }

    // Apply sorting based on the selected filter
    if (selectedFilter === "price") {
      updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "popularity") {
      updatedProducts = updatedProducts.sort(
        (a, b) => b.popularity - a.popularity
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, products, activeCategory, selectedColor, selectedFilter]);

  // Load more products
  const loadMoreHandler = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleCategoryChange = (name) => {
    setActiveCategory(name.toLowerCase());
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <CiSearch />
            </button>
          </div>
        </div>

        {/* CATEGORIES AND FILTERS WRAPPER */}
        <div className="flex items-center justify-between px-10">
          {/* CATEGORIES */}
          <div className="bg-white flex items-center justify-center space-x-12 px-5 py-10">
            {categories.map((cat, indx) => (
              <CategoryBubble
                data={cat}
                key={indx}
                activeComp={activeCategory}
                onClick={handleCategoryChange}
              />
            ))}
          </div>
          {/* FILTERS */}
          <div className="bg-white flex items-center justify-center space-x-12 px-5 py-10">
            {/* COLOR */}
            <div>
              <span className="mr-2">Color</span>
              <select
                name="Color"
                className="border py-2 px-4 rounded outline-0 capitalize"
                onChange={handleColorChange}
              >
                <option value="">All Colors</option>
                {colors.map((item, indx) => (
                  <option value={item.name} key={indx}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* PRICE/POPULARITY */}
            <div>
              <span className="mr-2">Filter</span>
              <select
                name="Filter"
                className="border py-2 px-4 rounded outline-0 capitalize"
                onChange={handleFilterChange}
              >
                <option value="default">Default</option>
                {filters.map((filter, indx) => (
                  <option value={filter.name.toLowerCase()} key={indx}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20">
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
