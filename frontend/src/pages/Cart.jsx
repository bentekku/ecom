import Sidebar from "../components/Sidebar";
import CartItems from "../components/CartItems";

const Cart = () => {
  return (
    <div>
      <Sidebar />
      {/* Pushing the page to right-side */}
      <div className="ml-[80px]">
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
        </div>

        <div className="px-8 py-10 flex flex-col w-full h-screen border border-green-500">
          <h1 className="text-4xl font-thin mb-2">Shopping Cart</h1>
          <hr />
          <div className="border border-violet-400 w-full h-full mt-2 mb-2">
            <CartItems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
