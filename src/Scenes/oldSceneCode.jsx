// src/Scenes/OldScienceScene.jsx
import Phaser from "phaser";

const OldScienceScene = (setCurrentScene, disableScience) => {
  return {
    preload: function () {
      this.load.image("background", "../../public/backgrounds/pokeman.jpg");
    },

    create: function () {
      // Add background image
      this.add.image(400, 300, "background").setScale(0.8).setOrigin(0.5, 0.5);

      // Button to teleport back to the FirstScene (no science teleport disabling)
      const backButton = this.add
        .text(400, 400, "Back to Phaser Game", {
          fontSize: "32px",
          fill: "#fff",
          backgroundColor: "#000",
        })
        .setOrigin(0.5)
        .setInteractive();

      backButton.on("pointerdown", () => {
        console.log("Returning to Phaser Game (FirstScene)...");
        setCurrentScene("FirstScene"); // Go back to FirstScene without disabling science teleport
      });

      // Button to teleport back and disable science teleport
      const disableButton = this.add
        .text(400, 500, "Disable Science Teleport and Return", {
          fontSize: "28px",
          fill: "#fff",
          backgroundColor: "#000",
        })
        .setOrigin(0.5)
        .setInteractive();

      disableButton.on("pointerdown", () => {
        console.log(
          "Disabling Science Teleport and returning to Phaser Game..."
        );
        disableScience(); // Trigger science teleport disabling
        setCurrentScene("FirstScene"); // Go back to FirstScene and disable science teleport
      });
    },
  };
};

export default OldScienceScene;
