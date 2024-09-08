import { CiShoppingCart } from "react-icons/ci";
import PropTypes from "prop-types";

const Product = ({ data }) => {
  return (
    <div className="product !h-fit h-[300px] bg-white drop-shadow-2xl p-2 border">
      <img src={data.img} alt="" className="w-full h-[60%] object-cover p-2" />
      <div className="m-2 bg-gray-100 p-2 space-y-2">
        <h1 className="text-xl font-semibold">{data.title}</h1>
        <p className="text-sm text-ellipsis">{data.desc}</p>
        <div className="flex justify-between items-center h-1/3">
          <p className="text-xl font-bold">{data.price}</p>
          <CiShoppingCart size={"1.4rem"} />
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }),
};

export default Product;
