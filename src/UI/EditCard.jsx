import { useState } from "react";
import "./EditCard.scss";

const EditCard = ({ image }) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [displaySave, setDisplaySave] = useState(false);
  const handleOnImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDisplaySave(true);
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result); //update image with base64 URL
      };
      reader.readAsDataURL(file); //convert the file to base64 string
    }
  };
  console.log(currentImage);

  const handleEditClick = () => {
    document.getElementById("imageUpload").click();
  };

  const handleOnSave = () => {
    console.log("saved");
  };
  return (
    <div className="editCard-container">
      <div className="editCard-header">
        <p>Profile Image</p>
        <button onClick={handleEditClick}>Edit</button>

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

export default EditCard;
