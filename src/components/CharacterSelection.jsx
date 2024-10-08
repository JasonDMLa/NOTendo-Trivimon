import React, { useState } from "react";
import PlayerA from "../../public/CharacterSelection/PlayerA.png";
import PlayerB from "../../public/CharacterSelection/PlayerB.png";
import PlayerC from "../../public/CharacterSelection/PlayerC.png";


const CharacterSelection = ({ setSelectedImage }) => {
  // State to keep track of the selected image
  const [selectedImage, setSelectedImageState] = useState(null);

  // Function to handle image selection
  const toggleImageState = (imageNumber) => {
    setSelectedImageState(imageNumber); // Update local state
    setSelectedImage(imageNumber); // Update parent state
  };

  return (
    <div className="image-container">
      {/* Image 1 */}
      <div onClick={() => toggleImageState("A")} className={selectedImage === "A" ? "selected" : ""}>
        <img src={PlayerA} alt="Image 1" className="CharImage" />
      </div>

      {/* Image 2 */}
      <div onClick={() => toggleImageState("B")} className={selectedImage === "B" ? "selected" : ""}>
        <img src={PlayerB} alt="Image 2" className="CharImage" />
      </div>

      {/* Image 3 */}
      <div onClick={() => toggleImageState("C")} className={selectedImage === "C" ? "selected" : ""}>
        <img src={PlayerC} alt="Image 3" className="CharImage" />
      </div>
    </div>
  );
};

export default CharacterSelection;
