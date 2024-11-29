import "./EditCard.scss";
const EditTextCard = ({
  label,
  data,
  text,
  cardID,
  required,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onInputChange,
  displaySave,
}) => {
  return (
    <div
      id={cardID}
      onClick={() => {
        onEditClick(cardID);
      }}
      className="editCard-container"
    >
      <div className="editCard-header">
        <p style={{ alignSelf: "flex-start" }}>{label}</p>
        {!displaySave && (
          <button onClick={() => onEditClick(cardID)}>Edit</button>
        )}
        {displaySave && (
          <button onClick={(event) => onCancelClick(event, cardID)}>
            {/* passing the event object to prevent propagation to the parent event function */}
            Cancel
          </button>
        )}
      </div>
      <div className="editCard-footer">
        {!displaySave ? (
          <p className="editCard-textData">{data}</p>
        ) : (
          // <form onSubmit={(event) => onSaveClick(cardID, event)}>

          <div className="inputText-container">
            <input
              className="editCard-textInput"
              type="text"
              value={data}
              onChange={(event) => onInputChange(event, cardID)}
              required={required}
            />
            <p>{text}</p>
          </div>
          // </form>
        )}
        <button
          disabled={!displaySave}
          onClick={(event) => onSaveClick(cardID, event)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTextCard;
