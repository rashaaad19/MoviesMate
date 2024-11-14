import "./CategorySelectItem.scss";
import { useDispatch } from "react-redux";
import { discoverActions } from "./../store/DiscoverSlice";
const CategorySelectItem = ({ options, htmlFor, id, name }) => {
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    const itemSelected = event.target.value;

    switch (event.target.name) {
      case "year":
        console.log("year option is clicked");
        console.log(itemSelected);
        break;
      case "genre":
        console.log("genre option is clicked");

        break;
      case "language":
        console.log("language option is clicked");

        break;
      case "sort by":
        console.log("sort by option is clicked");
        dispatch(discoverActions.changeSortBy(itemSelected));

        break;
    }
  };
  return (
    <p className="categoryInput-container">
      <label htmlFor={htmlFor}>{name}</label>
      <select name={name} id={id} onChange={handleOnChange}>
        {options.map((optionName) => (
          <option key={optionName.name} value={optionName.name}>
            {optionName.name}
          </option>
        ))}
      </select>
    </p>
  );
};

export default CategorySelectItem;
