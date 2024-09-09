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

        <div className="px-8 py-10 flex flex-col w-full h-screen border-0 border-green-500">
          <h1 className="text-4xl font-thin mb-2">Shopping Cart</h1>
          <hr />
          <div className="border-0 border-violet-400 w-full h-full mt-2 mb-2">
            {/* CONTAINER */}
            <div className=" flex justify-between w-full h-full p-8">
              <div className="left-section flex-1">
                {/* CART ITEMS */}
                <CartItems />
              </div>

              <div className="right-section h-full w-[580px]">
                <div className="border shadow-sm rounded h-full w-full flex flex-col items-end">
                  <h1 className="uppercase text-5xl font-thin self-center mt-8">
                    Total
                  </h1>
                  <div className="flex flex-col h-full w-full  py-24 px-2 justify-between">
                    <p className="text-xl font-medium flex justify-between px-8">
                      Sub-Total: <span className="font-light">$72.00</span>
                    </p>
                    <hr />
                    <p className="text-xl font-medium flex justify-between px-8">
                      Discount: <span className="font-light">$0.00</span>
                    </p>
                    <hr />
                    <p className="text-xl font-medium flex justify-between px-8">
                      Delivery Charges:{" "}
                      <span className="font-light">$5.00</span>
                    </p>
                    <hr />
                    <p className="text-xl font-medium flex justify-between px-8">
                      Total: <span className="font-light">$77.00</span>
                    </p>
                    <button className="border border-black bg-white text-black font-medium text-lg p-5 rounded-md hover:bg-black hover:text-white transition-all">
                      Proceed with Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
