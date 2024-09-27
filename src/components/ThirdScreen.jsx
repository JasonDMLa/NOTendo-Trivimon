import Phaser from "phaser";

const ThirdScene = (setCurrentScene) => {
  return {
    player: null,
    cursors: null,

    preload: function () {
      this.load.image("background", "../../public/pokeman.jpg");
      this.load.image("playerUp", "../../public/playerUp.png");
      this.load.image("playerDown", "../../public/playerDown.png");
      this.load.image("playerLeft", "../../public/playerLeft.png");
      this.load.image("playerRight", "../../public/playerRight.png");
      this.load.image("tree", "../../public/tree.png");
      this.load.image("teleporter", "../../public/teleporter.png");
    },

    create: function () {
      this.add.image(400, 300, "background").setScale(0.8).setOrigin(0.5, 0.5);
      this.player = this.physics.add.sprite(400, 300, "playerDown").setScale(0.8);
      this.player.setCollideWorldBounds(true);

      // Create a button for teleportation
      const teleportButton = this.add.text(400, 500, 'Teleport Back', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
      }).setOrigin(0.5).setInteractive();

      teleportButton.on('pointerdown', () => {
        console.log("Teleporting back to Phaser Game...");
        setCurrentScene("FirstScene"); // Change scene back to FirstScene
      });

      // Static obstacles group
      const obstacles = this.physics.add.staticGroup();
      obstacles.create(200, 200, "tree").setScale(0.5).refreshBody();
      obstacles.create(600, 400, "tree").setScale(0.5).refreshBody();

      // Create cursors for player movement
      this.cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {
      if (!this.player) return;

      this.player.setVelocity(0);

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-250);
        this.player.setTexture("playerLeft");
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(250);
        this.player.setTexture("playerRight");
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-250);
        this.player.setTexture("playerUp");
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(250);
        this.player.setTexture("playerDown");
      }
    },
  };
};

export default ThirdScene;
