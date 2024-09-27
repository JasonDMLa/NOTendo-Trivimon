import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene
  const [house2Teleported, setHouse2Teleported] = useState(false); // New flag to disable house2 teleport

  const disableHouse2 = () => {
    setHouse2Teleported(true); // Disables house2 teleport when called
  };

  useEffect(() => {
    let player;
    let cursors;
    let background;
    let obstacles;
    let mouseText;
    let teleporter;
    let house1;
    let house2;
    let staticHouse2;

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

        obstacles = this.physics.add.staticGroup();
        obstacles.create(515, 293, "tree").setScale(0.5).refreshBody();
        obstacles.create(500, 450, "tree").setScale(0.5).refreshBody();

        teleporter = this.physics.add
          .staticImage(110, 485, "teleporter")
          .setScale(0.1);
        house1 = this.physics.add.staticImage(113, 351, "house1").setScale(0.1);
        house2 = this.physics.add.staticImage(120, 200, "house2").setScale(0.3);

        // Retain hitbox logic unchanged
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

        // Teleportation logic for teleporter and house1
        this.physics.add.overlap(player, teleporter, () => {
          console.log("Player hit the teleporter!");
          setCurrentScene("SecondScreen");
        });

        this.physics.add.overlap(player, house1, () => {
          console.log("Player hit house1!");
          setCurrentScene("SecondScreen");
        });

        // Disable house2 teleportation after first use (based on flag)
        if (!house2Teleported) {
          this.physics.add.overlap(player, house2, () => {
            console.log("Player hit house2! Teleporting to ThirdScreen...");
            setCurrentScene("ThirdScreen"); // Go to ThirdScreen without disabling house2 yet
          });
        } else {
          // Replace house2 with a static version (like the tree) once disabled
          staticHouse2 = this.physics.add.staticImage(120, 200, "house2").setScale(0.3);
          staticHouse2.body.setSize(staticHouse2.width * 0.3, staticHouse2.height * 0.3);
          staticHouse2.body.setOffset(
            (staticHouse2.width - staticHouse2.width * 0.3) / 2,
            (staticHouse2.height - staticHouse2.height * 0.3) / 2
          );
          
          // Add collision so the player can't pass through
          this.physics.add.collider(player, staticHouse2, () => {
            console.log("Player collided with the static house2");
          });
        }

        this.physics.add.collider(player, obstacles, () => {
          console.log("Player hit an obstacle!");
        });

        cursors = this.input.keyboard.createCursorKeys();

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
          debug: true,
        },
      },
      scene:
        currentScene === "FirstScene"
          ? FirstScene
          : currentScene === "SecondScreen"
          ? SecondScreen
          : ThirdScreen(setCurrentScene, disableHouse2), // Pass disableHouse2 function to ThirdScreen
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene, house2Teleported]); // Added house2Teleported to dependencies

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
