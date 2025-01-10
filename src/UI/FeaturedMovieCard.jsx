import { Link } from "react-router-dom";
import "./FeaturedMovieCard.scss";
const FeaturedMovieCard = () => {
  return (
    <div className="featuredMovie-container">
      <div>
        <h3>Featured in MoviesMate</h3>
        <p>Best movie featured for today</p>
      </div>

      <div>
        <h4>Oppenheimer</h4>
        <p>
          <img src="/star-svgrepo-com.svg" />
          4.6
        </p>
        <p>3h - 2023 - Biography - Drama</p>
        <p>
          During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J.
          Robert Oppenheimer to work on the top-secret Manhattan Project.
          Oppenheimer and a team of scientists spend years developing and
          designing the atomic bomb. Their work comes to fruition on July 16,
          1945, as they witness the world&apos;s first nuclear explosion,
          forever changing the course of history.
          <Link to={'/movies/872585'}>See More</Link>
        </p>
      </div>
    </div>
  );
};

export default FeaturedMovieCard;
