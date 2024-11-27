import { useState } from "react";
import "./EditCard.scss";

const EditImageCard = ({ image }) => {
  const [currentImage, setCurrentImage] = useState(image); //state to keep the image
  const [displaySave, setDisplaySave] = useState(false); //state to control save button

  //function listening to changes in the image input
  const handleOnImageChange = (event) => {
    //extracting the first selected element
    const file = event.target.files[0];
    //check the selection of image
    if (file) {
      setDisplaySave(true); //displaying the save button to the user
      const reader = new FileReader(); // using FileReader constructor to read the data selected
      reader.onload = () => {
        setCurrentImage(reader.result); //update image with base64 URL
      };
      reader.readAsDataURL(file); //convert the file to base64 string
    }
  };

  //manipulate the input dom element to open when edit button is clicked
  const handleEditClick = () => {
    document.getElementById("imageUpload").click();
  };
  const handleCancelClick = () => {
    //reset data on cancel click
    setCurrentImage(image);
    setDisplaySave(false);
  };

  //TODO: add edited data to firestore
  const handleOnSave = () => {
    console.log("saved");
  };

  return (
    <div className="editCard-container">
      <div className="editCard-header">
        <p>Profile Image</p>
        {!displaySave && <button onClick={handleEditClick}>Edit</button>}
        {displaySave && <button onClick={handleCancelClick}>Cancel</button>}
        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleOnImageChange}
        />
      </div>
      <div className="editCard-footer">
        <img src={currentImage} alt="profile" />
        {
          <button onClick={handleOnSave} disabled={!displaySave}>
            Save
          </button>
        }
      </div>
    </div>
  );
};

export default EditImageCard;
