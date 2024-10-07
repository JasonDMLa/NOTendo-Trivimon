import React, { useState } from "react";
import PlayerA from "../../public/CharacterSelection/PlayerA.png";
import PlayerB from "../../public/CharacterSelection/PlayerB.png";
import PlayerC from "../../public/CharacterSelection/PlayerC.png";
import PhaserGame from "./PhaserGame";
import CreateAccount from "./CreateAccount";
const CharacterSelection = () => {
  // Initial state: All images are unselected
  const [clickedImage, setClickedImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Function to toggle the state of an image
  const toggleImageState = (imageNumber) => {
    setSelectedImage(imageNumber);
    setClickedImage(true);
  };

  if (clickedImage) {
    console.log(selectedImage);
    return <CreateAccount selectedImage={selectedImage} />;
  }

  return (
    <div className="image-container">
      {/* Image 1 */}
      <div onClick={() => toggleImageState("A")}>
        <img src={PlayerA} alt="Image 1" />
      </div>

      {/* Image 2 */}
      <div onClick={() => toggleImageState("B")}>
        <img src={PlayerB} alt="Image 2" />
      </div>

      {/* Image 3 */}
      <div onClick={() => toggleImageState("C")}>
        <img src={PlayerC} alt="Image 3" />
      </div>
    </div>
  );
};

export default CharacterSelection;
