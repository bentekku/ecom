import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  incrementQuantity,
  decrementQuantity,
  addToCart,
} from "../slices/cartSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetails, quantity, loading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  const handleQuantityClick = (str) => {
    if (str === "plus") {
      dispatch(incrementQuantity());
    } else if (str === "minus") {
      dispatch(decrementQuantity());
    }
  };

  const handleAddToCart = () => {
    // Directly pass parameters to addToCart
    dispatch(
      addToCart({
        id: productDetails._id,
        name: productDetails.name,
        price: productDetails.price,
        quantity: quantity,
        imgURL: productDetails.imgURL,
      })
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Sidebar />
      <div className="ml-[80px]">
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
        </div>

        {productDetails ? (
          <div className="product-details px-8 py-20 flex justify-between items-center mr-10 w-full border-0 border-yellow-500">
            <div className="flex-1 flex items-center justify-center">
              <img
                src={productDetails.imgURL}
                alt={productDetails.name}
                className="object-cover h-[640px]"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col self-start border-0 border-red-500 w-full h-full ml-10 flex-1 p-8">
              <h2 className="text-4xl font-thin">{productDetails.name}</h2>
              <p className="mt-6 max-w-[70%]">
                {/* {productDetails.description} */}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam deleniti explicabo voluptatum magnam adipisci quae,
                excepturi aut eligendi pariatur expedita, natus id cumque
                officia nihil asperiores hic, commodi dolor aperiam laboriosam
                laudantium quaerat! Autem distinctio modi minima et nostrum
                officiis?
              </p>
              <p className="mt-12 text-2xl font-base">
                ${productDetails.price}
              </p>

              <div className="mt-16">
                <div className="mb-12">
                  <span>Color:</span>
                  <select
                    name="colors"
                    id="colorSelection"
                    className="capitalize border p-2 rounded-md ml-2 mr-2 outline-0"
                  >
                    {productDetails.color.map((colItem, indx) => (
                      <option name={colItem} key={indx}>
                        {colItem}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center mt-4">
                    <p className="mr-2">Quantity:</p>
                    <button
                      className="border px-1 rounded-sm"
                      onClick={() => handleQuantityClick("minus")}
                    >
                      -
                    </button>
                    <p className="ml-4 mr-4">{quantity}</p>
                    <button
                      className="border px-1 rounded-sm"
                      onClick={() => handleQuantityClick("plus")}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="border py-2 px-5 rounded bg-black text-white font-medium cursor-pointer w-[12rem]"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>No product details available.</p>
        )}
      </div>
    </>
  );
};

export default SingleProductPage;
