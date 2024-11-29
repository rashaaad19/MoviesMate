import "./MyProfile.scss";
import ProfileHeader from "../UI/ProfileHeader";
import ProfileBadge from "../UI/ProfileBadge";

import { Link, redirect, useLoaderData } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CiCalendar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { TiAttachment } from "react-icons/ti";

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
              src={profileData.image?profileData.image:'/Default-Avatar.jpg'}
            />
            <div className="personalData-container">
              <div>
                <h1>{profileData.name}</h1>
                <p className="userName">{profileData.userName}</p>
                {profileData.bio && (
                  <p className="profileData-bio">{profileData.bio}</p>
                )}
                <div className="profileBadges-container">
                  <ProfileBadge
                    label={"Joined 2024"}
                    icon={
                      <CiCalendar
                        style={{ paddingRight: "5px" }}
                        size={"1.5em"}
                      />
                    }
                  />
                  {profileData.location && (
                    <ProfileBadge
                      label={profileData.location}
                      icon={
                        <FaLocationDot
                          style={{ paddingRight: "5px" }}
                          size={"1.2em"}
                        />
                      }
                    />
                  )}
                </div>
                {profileData.links && (
                  <a className="userLinks" href={profileData.links} target="_blank">
                    <TiAttachment
                      // style={{ paddingRight: "5px" }}
                      size={"1.2em"}
                    />
                    {profileData.links}
                  </a>
                )}
              </div>
              <Link to={"edit"} className="editProfile-anchor">Edit Profile</Link>
            </div>

            <div className="userDiary">
              <p className="diaryMovies-content">
                <span>0</span> <span>Watched</span>
              </p>
              <p className="diaryMovies-content">
                <span>0</span> <span>Favourite</span>
              </p>
              <p className="diaryMovies-label">Movies since joining MoviesMate</p>
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
