import PropTypes from "prop-types";
import "../index.css";

const CategoryBubble = ({ data, activeComp, onClick }) => {
  return (
    <div
      className={`px-5 py-2 rounded-full drop-shadow-xl cursor-pointer ${
        activeComp === data.name.toLowerCase() ? "active" : "inactive"
      }`}
      onClick={() => onClick(data.name)}
    >
      <p>{data.name}</p>
    </div>
  );
};

CategoryBubble.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
  }),
  activeComp: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryBubble;
