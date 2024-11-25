import { Link, useNavigate } from "react-router-dom";
import "./ProfileHeader.scss";
const ProfileHeader = ({ type, name }) => {
  const navigate = useNavigate();
  return (
    <div className="profilePage-header">
      {type === "profileOnly" ? (
        <div>
          <span>My Profile</span>
          <span>•</span>
          <span>{name}</span>
        </div>
      ) : (
        <div>
          <Link to="#" onClick={() => navigate(-1)}>
            My Profile
          </Link>

          <span>•</span>
          <span>{name}</span>

          <span>•</span>
          <span>Edit</span>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
