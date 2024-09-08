import { CiSearch, CiShoppingCart } from "react-icons/ci";
import watch from "../assets/watch.jpg";
import sneakers from "../assets/sneakers.jpg";
import sunGlasses from "../assets/sunglasses.jpg";
import headPhones from "../assets/headphones.jpg";
import { products } from "../data";
import Product from "./Product";

const Main = () => {
  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-10">
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
          {/* componentify this */}
          <div className="bg-black text-white px-5 py-2 rounded-full drop-shadow-xl">
            <p>Watches</p>
          </div>
          <div className="bg-white text-black px-5 py-2 rounded-full drop-shadow-xl">
            <p>Caps</p>
          </div>
          <div className="bg-white text-black px-5 py-2 rounded-full drop-shadow-xl">
            <p>Headphone</p>
          </div>
        </div>

        <div className="products grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20">
          {/* componentify this */}
          {products.map((prod) => (
            <Product data={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
