import "./MovieCard.scss";

import { Link } from "react-router-dom";
const MovieCard = ({ image, rank, title, yearAndRate }) => {
  return (
    <Link style={{ textDecoration: "none" }}>
      <div className="movieCard-container">
        <img src={image} />
        <p>{rank}</p>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
