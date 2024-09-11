import "./MovieCard.scss";
const MovieCard = ({ image, rank, title, yearAndRate }) => {
  return (
    <div className="movieCard-container">
      <img src={image} />
      <p>{rank}</p>
      <p>{title}</p>
    </div>
  );
};

export default MovieCard;
