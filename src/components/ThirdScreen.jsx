import Phaser from "phaser";

const ThirdScreen = (setCurrentScene) => {
  return {
    preload: function () {
      this.load.image("background", "../../public/pokeman.jpg");
    },

    create: function () {
      // Add background image
      this.add.image(400, 300, "background").setScale(0.5).setOrigin(0.5, 0.5);

      // Create a button to teleport back to the Phaser game
      const teleportButton = this.add.text(400, 500, 'Teleport Back', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
      }).setOrigin(0.5).setInteractive();

      teleportButton.on('pointerdown', () => {
        console.log("Teleporting back to Phaser Game...");
        setCurrentScene("FirstScene"); // Change scene back to FirstScene
      });
    },
  };
};

export default ThirdScreen;
