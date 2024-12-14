import { Link } from "react-router-dom";
import "./ErrorBanner.scss";
const ErrorBanner = ({ image, message, link }) => {
  return (
    <div className="errorBanner-container">
      <img src={image} />
      <h1>{message}</h1>
      <Link to={link}>Sign up now.</Link>
    </div>
  );
};

export default ErrorBanner;
