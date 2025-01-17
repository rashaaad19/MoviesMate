import "./ProfileBadge.scss";


const ProfileBadge = ({label, icon}) => {
  return (
    <p className="profileBadge">
     {icon}
      {label}
    </p>
  );
};

export default ProfileBadge;
