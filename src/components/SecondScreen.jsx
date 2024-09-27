import Phaser from "phaser";

class SecondScreen extends Phaser.Scene {
  constructor(setCurrentScene, setHasBadge) {
    super("SecondScene");
    this.setCurrentScene = setCurrentScene;
    this.setHasBadge = setHasBadge;
    this.player = null;
    this.cursors = null;
    this.obstacles = null;
    this.badgeAcquired = false; // Flag to track badge acquisition
  }

  preload() {
    this.load.image("newBackground", "../../public/secondScreen.png");
    this.load.image("playerUp", "../../public/playerUp.png");
    this.load.image("playerDown", "../../public/playerDown.png");
    this.load.image("playerLeft", "../../public/playerLeft.png");
    this.load.image("playerRight", "../../public/playerRight.png");
    this.load.image("tree", "../../public/tree.png");
    this.load.image("teleporter", "../../public/teleporter.png");
  }

  create() {
    this.add.image(400, 300, "newBackground").setOrigin(0.5, 0.5);
    this.add.text(300, 250, "You've been teleported!", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.player = this.physics.add.sprite(400, 300, "playerDown").setScale(0.8);
    this.player.setCollideWorldBounds(true);

    this.obstacles = this.physics.add.staticGroup();
    this.obstacles.create(200, 200, "tree").setScale(0.5).refreshBody();
    this.obstacles.create(600, 400, "tree").setScale(0.5).refreshBody();

    this.teleporter = this.physics.add
      .staticImage(500, 100, "teleporter")
      .setScale(0.05);

    const acquireBadgeButton = this.add
      .text(600, 500, "Acquire Badge", {
        fontSize: "32px",
        fill: "#fff",
        backgroundColor: "#000",
      })
      .setOrigin(0.5)
      .setInteractive();

    acquireBadgeButton.on("pointerdown", () => {
      if (!this.badgeAcquired) {
        this.badgeAcquired = true;
        console.log("Badge acquired!");
        this.setHasBadge(true); // Notify React that badge is acquired
        this.setCurrentScene("FirstScene"); // Go back to FirstScene through React
      } else {
        console.log("You already have the badge.");
      }
    });

    this.physics.add.collider(this.player, this.obstacles, () => {
      console.log("Player hit an obstacle!");
    });

    this.physics.add.overlap(this.player, this.teleporter, () => {
      if (this.badgeAcquired) {
        console.log("Player hit the teleporter!");
        this.setCurrentScene("ThirdScene");
      } else {
        console.log("You need the badge to enter this area.");
      }
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
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
  }
}

export default SecondScreen;
