import "./CategorySelectItem.scss";
import { useDispatch } from "react-redux";
import { discoverActions } from "./../store/DiscoverSlice";
const CategorySelectItem = ({ options, htmlFor, id, name }) => {
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    let itemSelected = event.target.value;
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
        {options.map((optionName) => (
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
        ))}
      </select>
    </p>
  );
};

export default CategorySelectItem;
