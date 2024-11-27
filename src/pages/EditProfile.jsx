import { useLoaderData } from "react-router-dom";
import ProfileHeader from "../UI/ProfileHeader";
import EditImageCard from "../UI/EditImageCard";
import EditTextCard from "../UI/EditTextCard";
import { useState } from "react";

const EditProfile = () => {
  //!: BUG - the save handler is nott working

  const profileData = useLoaderData(); //extracting profile data
  const [textCards, setTextCards] = useState([
    {
      id: "username",
      label: "USERNAME",
      data: profileData.userName,
      displaySave: false,
      tempValue: profileData.userName,
    },
    {
      id: "name",
      label: "FULL NAME",
      data: profileData.name,
      displaySave: false,
      tempValue: profileData.name,
    },
    { id: "bio", label: "BIO", data: "", displaySave: false, tempValue: "" },
    {
      id: "nationality",
      label: "NATIONALITY",
      data: "",
      displaySave: false,
      tempValue: "",
    },
    {
      id: "links",
      label: "LINKS",
      data: "",
      displaySave: false,
      tempValue: "",
    },
  ]);

  const handleEditClick = ( id) => {
    const selectedCard = textCards.find((card) => card.id === id); //extract the selected card
    const updatedCard = { ...selectedCard, displaySave: true }; // update the selected card with the new value
    const newUpdatedCards = textCards.map((card) => //create new cards array with the updated one
      card.id === updatedCard.id ? updatedCard : card
    );
    setTextCards(newUpdatedCards);
  };

  const handleCancelClick = (event, id) => {
    event.stopPropagation();
    const selectedCard = textCards.find((card) => card.id === id); //extract the selected card
    const updatedCard = { ...selectedCard, displaySave: false }; // update the selected card with the new value
    const newUpdatedCards = textCards.map((card) => //create new cards array with the updated one
      card.id === updatedCard.id ? updatedCard : card
    );
    setTextCards(newUpdatedCards);
  };
  return (
    <div style={{ paddingInline: "10%" }}>
      <ProfileHeader type={"profileEdit"} name={profileData.name} />

      <EditImageCard image={profileData.image} />
      {textCards.map((card) => (
        <EditTextCard
          key={card.id}
          cardID={card.id}
          label={card.label}
          data={card.tempValue}
          displaySave={card.displaySave}
          onEditClick={handleEditClick}
          onCancelClick={handleCancelClick}
          // onSaveClick={handleSaveClick}
          // onInputChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default EditProfile;
