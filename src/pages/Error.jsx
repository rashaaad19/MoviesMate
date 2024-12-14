import { useRouteError } from "react-router-dom";
import "./Error.scss";
import ErrorBanner from "../UI/ErrorBanner";
import Navbar from "../components/Navbar";
import Footer from "../UI/Footer";
const Error = () => {
  const error = useRouteError();
console.log(error)
  return (
    <div>
      <Navbar />
      {error.status === 401 && (
        <ErrorBanner
          image={"/Mobile login-bro.png"}
          message={"Login or create account to set your lists"}
          link={'/signup'}
        />
      )}
      <Footer />
    </div>
  );
};

export default Error;
