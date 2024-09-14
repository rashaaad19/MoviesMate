import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div>
        <Link to="">Home</Link>
        <Link to="discover">Discover</Link>
        <Link to="my-movies">About</Link>
      </div>
      <div>
        <p>Help Center & Contact Us</p>
        <p>Legal Notices</p>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
      </div>
      <div>
        <p>© MoviesMate. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
