import { useLoaderData } from "react-router-dom";
import ProfileHeader from "../UI/ProfileHeader";
import EditImageCard from "../UI/EditImageCard";
import EditTextCard from "../UI/EditTextCard";
import { useState } from "react";

const EditProfile = () => {
  const profileData = useLoaderData();
  const [textCards, setTextCards] = useState([
    {
      id: "username",
      label: "USERNAME",
      data: profileData.userName,
      displaySave: false,
    },
    {
      id: "name",
      label: "FULL NAME",
      data: profileData.name,
      displaySave: false,
    },
    { id: "bio", label: "BIO", data: "", displaySave: false },
    { id: "nationality", label: "NATIONALITY", data: "", displaySave: false },
    { id: "links", label: "LINKS", data: "", displaySave: false },
  ]);

  const handleEditClick = (id) => {
    //update the text cards properties
    const updatedTextCards = textCards.map(
      //mapping through cards to check which card is clicked and needs to be updated
      (card) =>
        card.id === id
          ? { ...card, displaySave: true } // Activate clicked card
          : { ...card, displaySave: false } // Deactivate others
    );
    //update text cards state
    setTextCards(updatedTextCards);
  };

  const handleCancelClick = (event) => {
    //prevent triggering parent onClick  listeners -  Event Propagation
    event.stopPropagation();
    //update the text cards and setting displaySave to false
    const updatedTextCards = textCards.map((card) => ({
      ...card,
      displaySave: false,
    }));
    //update text cards state
    setTextCards(updatedTextCards);
    console.log("cancel");
  };
  const handleSaveClick = () => {
    console.log("saved");
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
          data={card.data}
          displaySave={card.displaySave}
          onEditClick={handleEditClick}
          onCancelClick={handleCancelClick}
          onSaveClick={handleSaveClick}
        />
      ))}
    </div>
  );
};

export default EditProfile;
