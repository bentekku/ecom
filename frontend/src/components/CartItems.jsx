const CartItems = () => {
  return (
    <>
      <div className="item-wrapper h-[190px] border p-2 rounded flex space-x-24 mr-24 mt-4 mb-4 !min-w-[390px]">
        <div className="image-wrapper h-full border-0 border-orange-300">
          <img src="https://placehold.co/400" alt="" className=" h-full" />
        </div>
        <div className="item-data border-0 border-blue-300 flex flex-col justify-around items-start w-full">
          <h1 className="text-2xl font-base underline underline-offset-4">
            Hiker Shoe
          </h1>
          <div className="w-full border-0 border-red-100 pr-8 font-medium text-lg">
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
    </>
  );
};

export default CartItems;
