import { useSelector } from "react-redux";

const MyProfile = () => {
  const userCred = useSelector((state) => state.userData.userCredentials);
  console.log(userCred);
  return <div>MyProfile</div>;
};

export default MyProfile;
