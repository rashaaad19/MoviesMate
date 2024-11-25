import "./MyProfile.scss";

import { doc, getDoc } from "firebase/firestore";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { db } from "../firebase";
import ProfileHeader from "../UI/ProfileHeader";
const MyProfile = () => {
  const profileData = useLoaderData();
  console.log(profileData);
  return (
    <div>
      {profileData && (
        <div className="profilePage-container">
          <ProfileHeader type={"profileOnly"} name={profileData.name} />
          <div className="profileData-container">
            <img
              className="personalImg"
              alt="profile image"
              src={profileData.image}
            />
            <div className="personalData-container">
              <div>
                <h1>{profileData.name}</h1>
                <p className="userName">{profileData.userName}</p>
                <p className="dateJoined">Joined 2024</p>
              </div>
              <Link to={"edit"}>Edit Profile</Link>
            </div>

            <div className="userDiary">
              <p>
                <span>0</span> <span>Watched</span>
              </p>
              <p>
                <span>0</span> <span>Favourites</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

export const loader = async () => {
  const documentID = localStorage.getItem("userID"); //extract userID from local storage
  const isAuth = localStorage.getItem("isAuth");
  const docRef = doc(db, "users", documentID);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error fetching document:", error);
  }

  console.log({ isAuth });

  if (isAuth === "false") {
    return redirect("/");
  }

  return null;
};
