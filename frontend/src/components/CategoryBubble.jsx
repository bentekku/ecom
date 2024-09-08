import PropTypes from "prop-types";

const CategoryBubble = ({ data }) => {
  return (
    <div
      className={`px-5 py-2 rounded-full drop-shadow-xl ${
        data.id === 1 ? "bg-black text-white" : "bg-white text-black "
      }`}
    >
      <p>{data.name}</p>
    </div>
  );
};

CategoryBubble.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default CategoryBubble;
