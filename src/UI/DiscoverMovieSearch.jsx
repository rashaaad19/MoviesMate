import SearchBar from "../components/SearchBar";
import {
  genreOptions,
  languageOptions,
  sortOptions,
  yearOptions,
} from "../data/filterOptions";
import CategorySelectItem from "./CategorySelectItem";
import "./DiscoverMovieSearch.scss";

const DiscoverMovieSearch = () => {

  return (
    <div className="searchSection-container">
      <form className="discoverMovies-form">
        <h1>Enter Movie Name</h1>
        <p className="searchInput-container">
          <SearchBar />
        </p>
        <div className="categoryFilters">
          <CategorySelectItem
            options={yearOptions}
            htmlFor="year"
            name="year"
            id="year"
          />
          <CategorySelectItem
            options={genreOptions}
            htmlFor="genre"
            name="genre"
            id="genre"
          />
          <CategorySelectItem
            options={languageOptions}
            htmlFor="language"
            name="language"
            id="language"
          />
          <CategorySelectItem
            options={sortOptions}
            htmlFor="sort by"
            name="sort by"
            id="sort by"
          />
        </div>
      </form>
    </div>
  );
};

export default DiscoverMovieSearch;
