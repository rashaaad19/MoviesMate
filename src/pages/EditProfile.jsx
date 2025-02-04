import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import ProfileHeader from "../UI/ProfileHeader";
import EditImageCard from "../UI/EditImageCard";
import EditTextCard from "../UI/EditTextCard";

const EditProfile = () => {
  const profileData = useLoaderData(); //extracting profile data
  const userID = profileData.id;
  const userRef = doc(db, "users", userID); //reference to user document in firestore

  const [textCards, setTextCards] = useState([
    {
      id: "name",
      label: "FULL NAME",
      text: "Add your full name or a nickname",
      data: profileData.name,
      displaySave: false,
      tempValue: profileData.name,
      required: true,
    },
    {
      id: "bio",
      label: "BIO",
      data: profileData.bio || "",
      text: "Share something about yourself. Try starting with some of your favourite films and genres",
      displaySave: false,
      tempValue: profileData.bio || "",
      required: false,
    },
    {
      id: "location",
      label: "LOCATION",
      data: "" || profileData.location,
      text: "Adding location to your profile lets friends know where you are in this big beautiful world",
      displaySave: false,
      tempValue: profileData.location || "",
      required: false,
    },
    {
      id: "links",
      label: "LINKS",
      data: "" || profileData.links,
      text: "Provide a link on your profile for a personal website or social media profile.",
      displaySave: false,
      tempValue: profileData.links || "",
      required: false,
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
    event.stopPropagation(); //prevent activating the parent function
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

  const handleSaveClick = async (id, event) => {
    event.stopPropagation(); //prevent activating the parent function
    event.preventDefault();

    const selectedCard = textCards.find((card) => card.id === id); //extract the selected card
    //update the real value based on input
    const newValue = {
      ...selectedCard,
      data: selectedCard.tempValue,
      displaySave: false,
    };
    //updage the text cards with the new text card
    const newUpdatedCards = textCards.map((card) =>
      card.id === newValue.id ? newValue : card
    );
    await updateDoc(userRef, {
      [id]: newValue.data,
    });
    //update the state after editing temp value
    setTextCards(newUpdatedCards);
  };

  //update the image to firestore funciton
  const handleSaveImage = async (newImage) => {
    await updateDoc(userRef, {
      image: newImage,
    });
  };

  return (
    <div
      style={{
        paddingInline: "10%",
        backgroundColor: "#2D2E33",
        paddingBottom: "25px",
      }}
    >
      <ProfileHeader type={"profileEdit"} name={profileData.name} />

      <EditImageCard
        image={profileData.image}
        id={"image"}
        onSaveImage={handleSaveImage}
      />
      {textCards.map((card) => (
        <EditTextCard
          key={card.id}
          cardID={card.id}
          label={card.label}
          data={card.tempValue}
          text={card.text}
          displaySave={card.displaySave}
          onEditClick={handleEditClick}
          onCancelClick={handleCancelClick}
          onSaveClick={handleSaveClick}
          onInputChange={handleInputChange}
          required={card.required}
        />
      ))}
    </div>
  );
};

export default EditProfile;
