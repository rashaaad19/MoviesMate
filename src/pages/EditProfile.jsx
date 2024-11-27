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
  // console.log(textCards.map((card) => ({ ...card, tempValue: card.data })));

  const handleEditClick = (id) => {
    //reseting all input fields
    const updatedTextCards = textCards.map(
      //mapping through cards to check which card is clicked and needs to be updated
      (card) =>
        card.id === id
          ? { ...card, displaySave: true } // Activate clicked card
          : { ...card, displaySave: false, tempValue: card.data } // deactivate card and reset value
    );
    //update text cards state
    setTextCards(updatedTextCards);
  };

  const handleCancelClick = (event) => {
    //prevent triggering parent onClick  listeners -  Event Propagation
    event.stopPropagation();

    //reesetting card properties after cancelation
    const updatedTextCards = textCards.map((card) => ({
      ...card,
      displaySave: false,
      tempValue: card.data,
    }));
    //update text cards state
    setTextCards(updatedTextCards);
    console.log("cancel");
  };

  //handle change in inputs
  const handleInputChange = (id, event) => {
    //update the text cards properties
    switch (id) {
      case "username": {
        const updatedInput = textCards.map(
          (card) =>
            card.id === "username"
              ? { ...card, tempValue: event.target.value } //updating the input field for clicked input
              : card // using same atributes for uncliked inputs
        );
        setTextCards(updatedInput); //updating the state with new tempValues
        break;
      }
      case "name": {
        console.log("name slected");
        const updatedInput = textCards.map(
          (card) =>
            card.id === "name"
              ? { ...card, tempValue: event.target.value } //updating the input field for clicked input
              : card // using same atributes for uncliked inputs
        );
        setTextCards(updatedInput); //updating the state with new tempValues

        break;
      }
      case "bio": {
        console.log("bio selected");
        const updatedInput = textCards.map(
          (card) =>
            card.id === "bio"
              ? { ...card, tempValue: event.target.value } //updating the input field for clicked input
              : card // using same atributes for uncliked inputs
        );
        setTextCards(updatedInput); //updating the state with new tempValues

        break;
      }
      case "nationality": {
        console.log("nationality selected");
        const updatedInput = textCards.map(
          (card) =>
            card.id === "nationality"
              ? { ...card, data: event.target.value } //updating the input field for clicked input
              : card // using same atributes for uncliked inputs
        );
        setTextCards(updatedInput); //updating the state with new tempValues

        break;
      }
      case "links": {
        console.log("links selected");
        const updatedInput = textCards.map(
          (card) =>
            card.id === "links"
              ? { ...card, data: event.target.value } //updating the input field for clicked input
              : card // using same atributes for uncliked inputs
        );
        setTextCards(updatedInput); //updating the state with new tempValues

        break;
      }
    }
  };
  const handleSaveClick = (id) => {
    console.log(textCards);
    const updatedTextCards = textCards.map((card) =>
      card.id === id
        ? {
            ...card,
            displaySave: false,
            data: card.tempValue,
          }
        : card
    );
    console.log(updatedTextCards);
    //update text cards state
    setTextCards(updatedTextCards);
  };
  // console.log(textCards);

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
