import { CiShoppingCart } from "react-icons/ci";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Redirects to /products/:id
  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="product h-[390px] bg-white drop-shadow-2xl p-2 border cursor-pointer flex flex-col justify-between"
      onClick={() => handleProductClick(data._id)}
    >
      <div
        className={`relative w-full h-[60%] ${
          !isLoaded ? "bg-gray-300 animate-pulse" : ""
        }`}
      >
        <img
          src={data.imgURL}
          alt={data.name}
          className={`w-full h-full object-cover p-2 transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="m-2 bg-gray-100 p-2 space-y-2 flex-1 flex flex-col justify-between">
        <h1 className="text-xl font-semibold">{data.name}</h1>
        <p className="text-sm text-ellipsis">{data.description}</p>
        <div className="flex justify-between items-center h-1/3">
          <p className="text-xl font-bold">${data.price}</p>
          <CiShoppingCart size={"1.4rem"} />
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
