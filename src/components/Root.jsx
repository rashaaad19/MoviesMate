import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../UI/Footer";
import ScrollToTop from "./ScrollToTop";
import { FadeLoader } from "react-spinners";

const Root = () => {
  const naviagtion = useNavigation();

  const loadingStyles = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <>
      <Navbar />
      {naviagtion.state === "loading" ? (
        <div style={loadingStyles}>
          <FadeLoader color="#f98727" />
          <ScrollToTop />
        </div>
      ) : (
        <main>
          <ScrollToTop />
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
};

export default Root;
