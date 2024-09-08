import { CiSearch } from "react-icons/ci";
import { categories, products } from "../data";
import CategoryBubble from "./CategoryBubble";
import Product from "./Product";

const Main = () => {
  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-10">
        {/* COMPONENTIFY THIS:- */}
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
          <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded"></div>
          <input
            type="text"
            placeholder="Search product"
            className="bg-transparent outline-0"
          />
          <button>
            <CiSearch />
          </button>
        </div>

        <div className="categories w-full flex space-x-8 px-5 py-10">
          {categories.map((cat) => (
            <CategoryBubble data={cat} key={cat.id} />
          ))}
          {console.log("rendering the component")}
        </div>

        <div className="products grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20">
          {products.map((prod) => (
            <Product data={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
