import { useState } from "react";
import "./EditCard.scss";

const EditImageCard = ({ image, id, onSaveImage }) => {
  const [currentImage, setCurrentImage] = useState(image); //state to keep the image
  const [displaySave, setDisplaySave] = useState(false); //state to control save button
  //function listening to changes in the image input
  const handleOnImageChange = (event) => {
    //extracting the first selected element
    const file = event.target.files[0];
    console.log(file);
    // Reset the input value to ensure onChange triggers even for the same file
    event.target.value = null;

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
  // const handleOnSave = () => {
  //   console.log("saved");
  // };

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
        <img src={currentImage?currentImage:'/Default-Avatar.jpg'} alt="profile" />
        {/*passing new image to parent component */}
        {
          <button
            onClick={() => {
              onSaveImage(currentImage);
              setDisplaySave(false);
            }}
            disabled={!displaySave}
          >
            Save
          </button>
        }
      </div>
    </div>
  );
};

export default EditImageCard;
