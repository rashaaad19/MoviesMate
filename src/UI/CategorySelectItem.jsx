import "./CategorySelectItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { discoverActions } from "./../store/DiscoverSlice";
import { capitalizeFirstLetter } from "../utilties/functions";

const CategorySelectItem = ({ options, htmlFor, id, name }) => {
  const dispatch = useDispatch();
  const currentSortBy = useSelector((state) => state.discover.sortBy);
  const currentYear = useSelector((state) => state.discover.year);
  const currentLanguage = useSelector((state) => state.discover.language);
  const currentGenre = useSelector((state) => state.discover.genre);

  console.log(currentSortBy)
  const handleOnChange = (event) => {
    let itemSelected = event.target.value.toLowerCase();
    dispatch(discoverActions.changePage(1));

    //reset to page one when filter changes
    switch (event.target.name) {
      case "year":
        itemSelected = JSON.parse(itemSelected);
        dispatch(discoverActions.changeYear(itemSelected));
        break;

      case "genre":
        dispatch(discoverActions.changeGenre(itemSelected));
        break;

      case "language":
        dispatch(discoverActions.changeLanguage(itemSelected));
        break;

      case "sort by":
        dispatch(discoverActions.changeSortBy(itemSelected));
        break;
    }
  };
  return (
    <p className="categoryInput-container">
      <label htmlFor={htmlFor}>{name}</label>
      <select name={name} id={id} onChange={handleOnChange}>
        {/* first option to sync the select item UI with redux*/}
        {name === "genre" && (
          <option key={currentGenre}>
            {capitalizeFirstLetter(currentGenre)}
          </option>
        )}
        {options.map(
          (optionName) =>
            optionName.name.toLowerCase() !==
              (currentGenre.toLowerCase() ||
                currentLanguage.toLowerCase() ||
                currentYear.toLowerCase() ||
                currentSortBy.toLowerCase()) && (
              <option
                key={optionName.name}
                value={
                  name === "year"
                    ? JSON.stringify(optionName.release_date)
                    : name === "language"
                    ? optionName.ISO_code
                    : name === "sort by"
                    ? optionName.code
                    : optionName.name
                }
              >
                {optionName.name}
              </option>
            )
        )}
      </select>
    </p>
  );
};

export default CategorySelectItem;
