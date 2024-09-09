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

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { items, filteredItems, status } = useSelector(
    (state) => state.products
  );
  const activeCategory = useSelector((state) => state.category);
  const selectedColor = useSelector((state) => state.color);
  const selectedFilter = useSelector((state) => state.filter);
  const visibleCount = useSelector((state) => state.visibility);

  // Fetch products when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Handle search, category, color, and filter updates
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
    console.log("Category selected:", name); // Debugging log
    dispatch(setActiveCategory(name));
  };

  const handleColorChange = (e) => {
    console.log("Color selected:", e.target.value); // Debugging log
    dispatch(setSelectedColor(e.target.value));
  };

  const handleFilterChange = (e) => {
    console.log("Filter selected:", e.target.value); // Debugging log
    dispatch(setSelectedFilter(e.target.value));
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
                <option value="all">All Colors</option>
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
                  <option value={filter.value} key={indx}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
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
