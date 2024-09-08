import Sidebar from "../components/Sidebar";
import CartItems from "../components/CartItems";

const Cart = () => {
  return (
    <div>
      <Sidebar />
      {/* Pushing the page to right-side */}
      <div className="ml-[80px]">
        <CartItems />
      </div>
    </div>
  );
};

export default Cart;
