import { doc, getDoc } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { json } from "react-router-dom";
import { db } from "../firebase";
import MovieList from "../UI/MovieList";

const Favourites = () => {
  const data=useLoaderData();
  const userFavs = data.movies.favourites;
  console.log(userFavs)
  return (
    <>
    <MovieList movies={userFavs} type='favourite'/>
    </>
  );
};

export default Favourites;

export const loader = async ({ params }) => {
  const userID = params.userID;
  //throw error if user is not auth.
  if (userID === "undefined") {
    throw json(
      { error: "user is not signed in" }, // JSON payload
      { status: 401, statusText: "not auth" } // Options for the response
    );
  }

  const docRef = doc(db, "users", userID);

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

  return null;
};
