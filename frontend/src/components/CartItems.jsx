import { useSelector, useDispatch } from "react-redux";

const CartItems = () => {
  const dispatch = useDispatch();
  const { itemsInCart, removeFromCart } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {itemsInCart.length > 0 ? (
        itemsInCart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between mb-4 border-b border-gray-300 pb-4"
          >
            <img
              src={item.imgURL}
              alt={item.name}
              className="w-24 h-24 object-cover"
            />
            <div className="flex-1 ml-4">
              <h2 className="text-xl font-medium">{item.name}</h2>
              <p className="text-lg">Price: ${item.price.toFixed(2)}</p>
              <p className="text-lg">Quantity: {item.quantity}</p>
            </div>
            <p className="text-lg font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => handleRemove(item.id)}
              className="border border-black text-black font-medium hover:text-white hover:bg-black py-1 px-3 rounded-md mx-6  transition-colors"
            >
              X
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartItems;
