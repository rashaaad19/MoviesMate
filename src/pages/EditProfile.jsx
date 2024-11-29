import { useLoaderData } from "react-router-dom";
import ProfileHeader from "../UI/ProfileHeader";
import EditImageCard from "../UI/EditImageCard";
import EditTextCard from "../UI/EditTextCard";
import { useState } from "react";

const EditProfile = () => {

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

  const handleEditClick = (id) => {
    //map through all cards and change displaySave value for selected card only
    const newUpdatedCards = textCards.map((card) => ({
      ...card,
      displaySave: card.id === id, // Set true for the selected card, false for others
    }));
    setTextCards(newUpdatedCards);
  };

  const handleCancelClick = (event, id) => {
    event.stopPropagation();    //prevent activating the parent function
    const selectedCard = textCards.find((card) => card.id === id); //extract the selected card
    // reset the card states after canceling
    const updatedCard = {
      ...selectedCard,
      displaySave: false,
      tempValue: selectedCard.data,
    };
    const newUpdatedCards = textCards.map(
      (
        card //create new cards array with the updated one
      ) => (card.id === updatedCard.id ? updatedCard : card)
    );
    setTextCards(newUpdatedCards);
  };

  const handleInputChange = (event, id) => {
    const selectedCard = textCards.find((card) => card.id === id); //extract the selected card
    const newValue = { ...selectedCard, tempValue: event.target.value }; //update the temp value based on input
    //updage the text cards with the new text card
    const newUpdatedCards = textCards.map((card) =>
      card.id === newValue.id ? newValue : card
    );
    //update the state after editing temp value
    setTextCards(newUpdatedCards);
  };


  //TODO: Push the new values to the user's firestore document

  
  const handleSaveClick = (id, event) => {

    event.stopPropagation(); //prevent activating the parent function
    const selectedCard = textCards.find((card) => card.id === id); //extract the selected card
    //update the real value based on input
    const newValue = {
      ...selectedCard,
      data: selectedCard.tempValue,
      displaySave: false,
    };
    setTextCards(false);
    //updage the text cards with the new text card
    const newUpdatedCards = textCards.map((card) =>
      card.id === newValue.id ? newValue : card
    );
    console.log(newUpdatedCards);
    //update the state after editing temp value
    setTextCards(newUpdatedCards);
  };

  console.log(textCards);
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
          onSaveClick={handleSaveClick}
          onInputChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default EditProfile;
