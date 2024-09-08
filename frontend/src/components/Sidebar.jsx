import { HiOutlineMenuAlt2, HiOutlineHome } from "react-icons/hi";
import { CiShoppingCart, CiDeliveryTruck } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <button>
            <HiOutlineMenuAlt2 />
          </button>
        </li>

        <li>
          <button>
            <HiOutlineHome />
          </button>
        </li>
        <li>
          <button>
            <CiShoppingCart />
          </button>
        </li>

        <li>
          <button>
            <CiDeliveryTruck />
          </button>
        </li>

        <li>
          <button>
            <IoHeartOutline />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
