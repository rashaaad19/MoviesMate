import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const runtimeFormatter = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formatedValue = `${hours}h ${remainingMinutes}m`;

  return formatedValue;
};

export const releaseDateFormatter = (date) => {
  const dateSplited = date.split("-");
  const year = dateSplited[0];

  return year;
};

export const currentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

export const validatePassword = (password) => {
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for special characters
  const hasCapitalLetter = /[A-Z]/.test(password); // Checks for capital letters
  if (hasCapitalLetter && hasSpecialChar) {
    return true;
  } else return false;
};

export const userNameGenerator = async (name) => {
  let userNamesArray = [] //initializing empty array
  //getting a copy of all userNames in the database
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    userNamesArray.push(doc.data().userName);
  });

  // Generate a random number 
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  // Combine the name with the random number
  let uniqueUsername = `${name.replaceAll(' ', '').toLowerCase()}${randomNumber}`;
  // Check if the generated username already exists in the database
  while (userNamesArray.includes(uniqueUsername)) {
    // If the username exists, generate a new one
    uniqueUsername = `${name}${Math.floor(Math.random() * 9000) + 1000}`;
  }

  return uniqueUsername;
}


