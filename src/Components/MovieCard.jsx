import { IMG_CDN_URL } from "../Utils/constants";
import PropTypes from "prop-types";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img src={IMG_CDN_URL + posterPath} alt="Movie card" />
    </div>
  );
};

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
};

export default MovieCard;
