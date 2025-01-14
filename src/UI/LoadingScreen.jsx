import { FadeLoader } from "react-spinners";
import ScrollToTop from "../components/ScrollToTop";

const LoadingScreen = () => {

    const loadingStyles = {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    
  return (
    <div style={loadingStyles}>
      <FadeLoader  color="#f98727" />
      <ScrollToTop />
    </div>
  );
};

export default LoadingScreen;
