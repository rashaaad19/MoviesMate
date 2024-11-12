import "./DiscoverMovieSection.scss";
const DiscoverMovieSection = () => {
  return (
    <div className="searchSection-container">
      <form className="discoverMovies-form">
        <h1>Enter Movie Name</h1>
        <p className="searchInput-container">
          <input type="text" id="movieName" title="movieName" />
          <button type="button">Search</button>
        </p>
        <p className="categoryInput-container">
          <label htmlFor="year">Year</label>
          <select name="year" id="year">
            <option value="all">All</option>
            <option value="2020-Now">2020-Now</option>
            <option value="2010-2019">2010-2019</option>
            <option value="2000-2009">2000-2009</option>
            <option value="1990-1999">1990-1999</option>
            <option value="1980-1989">1980-1989</option>
            <option value="1970-1979">1970-1979</option>
            <option value="1960-1969">1960-1969</option>
            <option value="1950-1959">1950-1959</option>
            <option value="1900-1949">1900-1949</option>
          </select>
        </p>
      </form>
    </div>
  );
};

export default DiscoverMovieSection;
