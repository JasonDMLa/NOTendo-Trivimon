import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import SecondScreen from "./SecondScreen"; // Import your SecondScreen component
import ThirdScreen from "./ThirdScreen"; // Import additional scenes as needed
import StartScreen from "./StartScreen";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene

  useEffect(() => {
    let player;
    let cursors;
    let background;
    let obstacles;
    // Mouse Decleartion
    let mouseText;
    // Individual variables for teleporters
    let teleporter;
    let house1;
    let house2;

    const FirstScene = {
      preload: function () {
        this.load.image("background", "../../public/mock.png");
        this.load.image("playerUp", "../../public/playerUp.png");
        this.load.image("playerDown", "../../public/playerDown.png");
        this.load.image("playerLeft", "../../public/playerLeft.png");
        this.load.image("playerRight", "../../public/playerRight.png");
        this.load.image("tree", "../../public/tree.png");
        this.load.image("teleporter", "../../public/teleporter.png");
        this.load.image("house1", "../../public/house.png");
        this.load.image("house2", "../../public/house2.png");
      },

      create: function () {
        background = this.add
          .image(400, 300, "background")
          .setScale(0.8)
          .setOrigin(0.5, 0.5);
        player = this.physics.add.sprite(400, 300, "playerDown").setScale(0.8);
        player.setCollideWorldBounds(true);

        // Static obstacles group
        obstacles = this.physics.add.staticGroup();
        obstacles.create(515, 293, "tree").setScale(0.5).refreshBody();
        obstacles.create(500, 450, "tree").setScale(0.5).refreshBody();

        // Create teleporters using images
        teleporter = this.physics.add
          .staticImage(110, 485, "teleporter")
          .setScale(0.1);
        house1 = this.physics.add.staticImage(113, 351, "house1").setScale(0.1);
        house2 = this.physics.add.staticImage(120, 200, "house2").setScale(0.3);

        // Set the hitbox size based on scaled dimensions
        teleporter.body.setSize(
          teleporter.width * 0.1,
          teleporter.height * 0.1
        );
        teleporter.body.setOffset(
          (teleporter.width - teleporter.width * 0.1) / 2,
          (teleporter.height - teleporter.height * 0.1) / 2
        );

        house1.body.setSize(house1.width * 0.1, house1.height * 0.1);
        house1.body.setOffset(
          (house1.width - house1.width * 0.1) / 2,
          (house1.height - house1.height * 0.1) / 2
        );

        house2.body.setSize(house2.width * 0.3, house2.height * 0.3);
        house2.body.setOffset(
          (house2.width - house2.width * 0.3) / 2,
          (house2.height - house2.height * 0.3) / 2
        );

        // Set up teleporting functionality for each image
        this.physics.add.overlap(player, teleporter, () => {
          console.log("Player hit the teleporter!");
          setCurrentScene("SecondScreen"); // Teleport to SecondScreen
        });

        this.physics.add.overlap(player, house1, () => {
          console.log("Player hit house1!");
          setCurrentScene("SecondScreen"); // Teleport to SecondScreen
        });

        this.physics.add.overlap(player, house2, () => {
          console.log("Player hit house2!");
          setCurrentScene("ThirdScreen"); // Teleport to ThirdScreen
        });

        // Player collides with obstacles
        this.physics.add.collider(player, obstacles, () => {
          console.log("Player hit an obstacle!");
        });

        cursors = this.input.keyboard.createCursorKeys();

        // Mouse coordinates display text
        mouseText = this.add.text(10, 10, "", {
          font: "16px Courier",
          fill: "#ffffff",
        });
      },

      update: function () {
        if (!player) return;

        player.setVelocity(0);

        if (cursors.left.isDown) {
          player.setVelocityX(-250);
          player.setTexture("playerLeft");
        } else if (cursors.right.isDown) {
          player.setVelocityX(250);
          player.setTexture("playerRight");
        }

        if (cursors.up.isDown) {
          player.setVelocityY(-250);
          player.setTexture("playerUp");
        } else if (cursors.down.isDown) {
          player.setVelocityY(250);
          player.setTexture("playerDown");
        }

        // Update mouse coordinates on the canvas
        const pointer = this.input.activePointer;
        mouseText.setText(
          `Mouse X: ${pointer.worldX.toFixed(
            0
          )}, Mouse Y: ${pointer.worldY.toFixed(0)}`
        );
      },
    };

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true, // Enable debug mode to see hitboxes
        },
      },
      scene:
        currentScene === "FirstScene"
          ? FirstScene
          : currentScene === "SecondScreen"
          ? SecondScreen
          : ThirdScreen(setCurrentScene), // Handle multiple scenes
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]); // Depend on the scene state

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
