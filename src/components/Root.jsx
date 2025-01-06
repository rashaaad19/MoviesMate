import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../UI/Footer";
import ScrollToTop from "./ScrollToTop";
import LoadingScreen from "../UI/LoadingScreen";

const Root = () => {
  const naviagtion = useNavigation();

  return (
    <>
      <Navbar />
      {naviagtion.state === "loading" ? (
        <LoadingScreen />
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
