import { CiShoppingCart } from "react-icons/ci";
import PropTypes from "prop-types";

const Product = ({ data }) => {
  return (
    // !h-fit
    <div
      className="product h-[390px] bg-white drop-shadow-2xl p-2 border cursor-pointer flex flex-col justify-between"
      onClick={() => console.log(`clicked: ${data.name}`)}
    >
      <img
        src={data.imgURL}
        alt=""
        className="w-full h-[60%] object-cover p-2"
      />
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
    // slug: PropTypes.string.isRequired,
  }),
};

export default Product;
