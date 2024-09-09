const CartItems = () => {
  return (
    // container
    <div className=" flex justify-between w-full h-full p-8">
      <div className="left-section flex-1">
        <div className="item-wrapper h-[190px] border p-2 rounded flex space-x-24 mr-24 mt-4 mb-4 !min-w-[390px]">
          <div className="image-wrapper h-full border border-orange-300">
            <img src="https://placehold.co/400" alt="" className=" h-full" />
          </div>
          <div className="item-data border border-blue-300 flex flex-col justify-around items-start w-full">
            <h1 className="text-2xl font-base underline underline-offset-4">
              Hiker Shoe
            </h1>
            <div className="w-full border border-red-100 pr-8 font-medium text-lg">
              <p className="flex items-center justify-between">
                Price: <span className="font-light">$72</span>
              </p>
              <p className="flex items-center justify-between">
                Color: <span className="font-light">Yellow</span>
              </p>
              <p className="flex items-center justify-between">
                Quantity: <span className="font-light">1</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="mt-4" />
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
              Delivery Charges: <span className="font-light">$5.00</span>
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
  );
};

export default CartItems;
