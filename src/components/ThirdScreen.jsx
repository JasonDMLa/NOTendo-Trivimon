import Phaser from "phaser";

const ThirdScreen = (setCurrentScene, disableHouse2) => {
  return {
    preload: function () {
      this.load.image("background", "../../public/pokeman.jpg");
    },

    create: function () {
      // Add background image
      this.add.image(400, 300, "background").setScale(0.8).setOrigin(0.5, 0.5);

      // Button to teleport back to the FirstScene (no house2 disabling)
      const backButton = this.add.text(400, 400, 'Back to Phaser Game', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
      }).setOrigin(0.5).setInteractive();

      backButton.on('pointerdown', () => {
        console.log("Returning to Phaser Game (FirstScene)...");
        setCurrentScene("FirstScene"); // Go back to FirstScene without disabling house2
      });

      // Button to teleport back and disable house2 teleport
      const disableButton = this.add.text(400, 500, 'Disable house2 and Return', {
        fontSize: '28px',
        fill: '#fff',
        backgroundColor: '#000',
      }).setOrigin(0.5).setInteractive();

      disableButton.on('pointerdown', () => {
        console.log("Disabling house2 and returning to Phaser Game...");
        disableHouse2(); // Trigger house2 teleport disabling
        setCurrentScene("FirstScene"); // Go back to FirstScene and disable house2 teleport
      });
    },
  };
};

export default ThirdScreen;
