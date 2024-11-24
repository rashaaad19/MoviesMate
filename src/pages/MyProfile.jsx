import { doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useMemo, useState } from "react";
const MyProfile = () => {
  const documentID = localStorage.getItem("userID"); //extract userID from local storage

  const docRef = useMemo(() => {
    //  Memoize docRef to prevent re-creation on each render and get reference to user doc in firestore
    return doc(db, "users", documentID);
  }, [documentID]);

  const [profileData, setProfileData] = useState(); //profile state to display the data
  const [isLoading, setIsLoading] = useState(true); //loading state

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [docRef]);

  console.log(profileData);
  return (
    <div>
      {isLoading && <h1>Loading..</h1>}
      {profileData && (
        <div className="profilePage-container">
          <div className="profilePage-header">
            <span>My Profile</span>
            <span>•</span>
            <span>{profileData.name}</span>
          </div>
          <div>
            <img src={profileData.image}/>
            <div>
              <h1>{profileData.name}</h1>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

export const loader = () => {
  const isAuth = localStorage.getItem("isAuth");

  console.log({ isAuth });

  if (isAuth === "false") {
    return redirect("/");
  }

  return null;
};
