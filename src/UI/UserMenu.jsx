import "./UserMenu.scss";
import { Link } from "react-router-dom";

const UserMenu = ({ image, name, userName, userID, onSignout }) => {
  return (
    <div className="userMenu-container">
      <Link to={`/user/${userID}`} className="userMenu-header">
        <img src={image} />
        <p> {name}</p>
        <p>{userName}</p>
      </Link>

      <div className="userMenu-list">
          <Link to={`/user/${userID}`}> View Profile</Link>
          <Link to={`/user/${userID}`}> Favourites</Link>
          <Link to={`/user/${userID}`}> Watched</Link>
          <Link to={`/user/${userID}`}> Ratings</Link>
          <p onClick={onSignout}> Sign Out </p>


      </div>
    </div>
  );
};

export default UserMenu;
