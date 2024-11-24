import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

const MyProfile = () => {
  const userCred = useSelector((state) => state.userData.userCredentials);
  console.log(userCred);
  return <div>MyProfile</div>;
};

export default MyProfile;


export const loader = () => {
  const isAuth = localStorage.getItem("isAuth");

  console.log({ isAuth });

  if (isAuth === 'false') {
    return redirect("/");
  }

  return null;
};
