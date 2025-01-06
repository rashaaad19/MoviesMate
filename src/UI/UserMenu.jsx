import "./UserMenu.scss";
import { Link } from "react-router-dom";

const UserMenu = ({ image, name, userName, userID, onSignout, removeMenu }) => {
  return (
    <div className="userMenu-container">
      <Link to={`/user/${userID}`} className="userMenu-header">
        <img src={image} />
        <p> {name}</p>
        <p>{userName}</p>
      </Link>

      <div className="userMenu-list">
          <Link to={`/user/${userID}`} onClick={removeMenu}> View Profile</Link>
          <Link to={`/favourites/${userID}`} onClick={removeMenu}> Favourites</Link>
          <Link to={`/watched/${userID}`} onClick={removeMenu}> Watched</Link>
          <Link to={`/reviews/${userID}`} onClick={removeMenu}> Ratings</Link>
          <p onClick={onSignout}> Sign Out </p>


      </div>
    </div>
  );
};

export default UserMenu;
