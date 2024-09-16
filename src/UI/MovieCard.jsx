import "./MovieCard.scss";

import { Link } from "react-router-dom";
const MovieCard = ({ image, rank, title, id }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`movies/${id}`}>
      <div className="movieCard-container">
        <img src={image} />
        <p>{rank}</p>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
