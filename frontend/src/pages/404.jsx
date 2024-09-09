import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <img
        src="https://i.giphy.com/xTiN0L7EW5trfOvEk0.webp"
        alt=""
        className="w-full h-full relative"
      />
      <button className="border border-black py-3 px-12 z-10 absolute top-[70%] rounded-md bg-black text-white font-bold">
        <Link to={"/"}>Homepage?</Link>
      </button>
    </div>
  );
};

export default NotFound;
