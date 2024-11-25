import { useLoaderData } from "react-router-dom";
import ProfileHeader from "../UI/ProfileHeader";
import EditCard from "../UI/EditCard";

const EditProfile = () => {
  const profileData = useLoaderData();
  console.log(profileData);
  return (
    <div style={{paddingInline:'10%'}}>
      <ProfileHeader type={"profileEdit"} name={profileData.name} />
      <EditCard image={profileData.image} />
    </div>
  );
};

export default EditProfile;
