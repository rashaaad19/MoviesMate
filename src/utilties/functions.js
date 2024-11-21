import { genreOptions } from "../data/filterOptions";

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
