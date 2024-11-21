import "./ReviewCard.scss";
const ReviewCard = ({ author, date, content, reviewURL }) => {
  return (
    <div className="reviewCard_container">
      <div className="reviewCard_header">
        <h4>{author}</h4>
        <p>
          9<span>/10</span>
        </p>
        <img src="/tmdbLogo_small.svg" />
      </div>
      <p>{content} </p>
      <div className="reviewCard_footer">
        <p>April 5, 2024</p>
        <a href={reviewURL}>Full Review</a>
      </div>
    </div>
  );
};

export default ReviewCard;
