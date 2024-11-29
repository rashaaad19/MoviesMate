import "./ProfileBadge.scss";

import { CiCalendar } from "react-icons/ci";

const ProfileBadge = ({label, icon}) => {
  return (
    <p className="profileBadge">
     {icon}
      {label}
    </p>
  );
};

export default ProfileBadge;
