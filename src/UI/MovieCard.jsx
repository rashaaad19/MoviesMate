import "./MovieCard.scss";

import { Link } from "react-router-dom";
const MovieCard = ({ image, rank, title, id, cardType }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`movies/${id}`}>
      <div className={`movieCard-container ${cardType}`}>
        <img src={image} />
        <p>{rank}</p>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
