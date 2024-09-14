import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../UI/Footer";

const Root = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
