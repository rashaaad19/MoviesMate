import { useEffect, useMemo, useState } from "react";
import "./SearchBar.scss";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../UI/LoadingScreen";
import { useDispatch } from "react-redux";
import { discoverActions } from "../store/DiscoverSlice";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();





  useEffect(() => {
    dispatch(discoverActions.changeQuery(query));
  }, [query]);
  return (
    <input
      type="text"
      id="movieName"
      title="movieName"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
