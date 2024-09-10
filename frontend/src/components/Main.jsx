import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { categories, colors, filters } from "../data";
import CategoryBubble from "./CategoryBubble";
import Product from "./Product";
import "../index.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filterProducts } from "../slices/productSlice";
import { setActiveCategory } from "../slices/categorySlice";
import { setSelectedColor } from "../slices/colorSlice";
import { setSelectedFilter } from "../slices/filterSlice";
import { loadMore } from "../slices/visibilitySlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const dispatch = useDispatch();
  const { items, filteredItems, status } = useSelector(
    (state) => state.products
  );
  const activeCategory = useSelector((state) => state.category);
  const selectedColor = useSelector((state) => state.color);
  const selectedFilter = useSelector((state) => state.filter);
  const visibleCount = useSelector((state) => state.visibility);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(
      filterProducts({
        searchTerm: searchTerm || "",
        selectedFilter: selectedFilter || "default",
        selectedColor: selectedColor || "all",
        activeCategory: activeCategory || "all",
        visibleCount: visibleCount || 5,
      })
    );
  }, [searchTerm, activeCategory, selectedColor, selectedFilter, dispatch]);

  const loadMoreHandler = () => {
    dispatch(loadMore());
  };

  const handleCategoryChange = (name) => {
    console.log("Category selected:", name);
    dispatch(setActiveCategory(name));
  };

  const handleColorChange = (e) => {
    console.log("Color selected:", e.target.value);
    dispatch(setSelectedColor(e.target.value));
  };

  const handleFilterChange = (e) => {
    console.log("Filter selected:", e.target.value);
    dispatch(setSelectedFilter(e.target.value));
  };

  // Handle search input and suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter suggestions from the items
    if (value.length > 1) {
      const filteredSuggestions = items
        .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        .map((item) => item.name);

      setSuggestions([...new Set(filteredSuggestions)]); // Unique suggestions
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  // Handle suggestion click
  // const handleSuggestionClick = (suggestion) => {
  //   setSearchTerm(suggestion);
  //   setSuggestions([]);
  //   setIsSuggestionsVisible(false);
  // };
  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await axios.get(
        `/api/products/name/${encodeURIComponent(suggestion)}`
      );
      const product = response.data;

      if (product && product._id) {
        // Assuming you use react-router
        navigate(`/products/${product._id}`);
        // For Next.js, use:
        // router.push(`/product/${product._id}`);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Failed to fetch product by name:", error);
    }
  };

  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-10">
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
          <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded relative">
            <input
              type="text"
              placeholder="Search product"
              className="bg-transparent outline-0"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button>
              <CiSearch />
            </button>
            {isSuggestionsVisible && (
              <div className="absolute top-[2rem] right-[0rem] bg-white border border-gray-300 rounded mt-2 w-full max-h-48 overflow-auto z-20">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-10">
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
          <div className="bg-white flex items-center justify-center space-x-12 px-5 py-10">
            <div>
              <span className="mr-2">Color</span>
              <select
                name="Color"
                className="border py-2 px-4 rounded outline-0 capitalize"
                onChange={handleColorChange}
              >
                <option value="all">All Colors</option>
                {colors.map((item, indx) => (
                  <option value={item.name} key={indx}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="mr-2">Filter</span>
              <select
                name="Filter"
                className="border py-2 px-4 rounded outline-0 capitalize"
                onChange={handleFilterChange}
              >
                <option value="default">Default</option>
                {filters.map((filter, indx) => (
                  <option value={filter.value} key={indx}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20">
          {filteredItems &&
            filteredItems
              .slice(0, visibleCount)
              .map((prod) => <Product data={prod} key={prod._id} />)}
        </div>

        {visibleCount < filteredItems.length && (
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
