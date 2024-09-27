import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import SecondScene from "./SecondScreen"; // Import your SecondScene component
import StartScreen from "./StartScreen";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene

  useEffect(() => {
    let player;
    let cursors;
    let background;
    let obstacles;

    const FirstScene = {
      preload: function () {
        this.load.image("background", "../../public/mock.png");
        this.load.image("playerUp", "../../public/playerUp.png");
        this.load.image("playerDown", "../../public/playerDown.png");
        this.load.image("playerLeft", "../../public/playerLeft.png");
        this.load.image("playerRight", "../../public/playerRight.png");
        this.load.image("tree", "../../public/tree.png"); // Asset for obstacle
        this.load.image("teleporter", "../../public/teleporter.png"); // Teleporter asset
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
        obstacles.create(200, 200, "tree").setScale(0.5).refreshBody();
        obstacles.create(600, 400, "tree").setScale(0.5).refreshBody();




        this.teleporter = this.physics.add
        .staticImage(500, 100, "teleporter")
        .setScale(0.1);

    
        this.teleporter.body.setSize(
          this.teleporter.width * 0.1,
          this.teleporter.height * 0.1
        );
        // Set the multiplier to the set scale (0.1)

        this.teleporter.body.setOffset(
          (this.teleporter.width - this.teleporter.width * 0.1) / 2,
          (this.teleporter.height - this.teleporter.height * 0.1) / 2
                );
         // Player overlaps with teleporter, triggers scene change in React
                this.physics.add.overlap(player, this.teleporter, () => {
                  console.log("Player hit the teleporter!");
                  setCurrentScene("SecondScene"); // Trigger scene change
                });

        // Player collides with obstacles
        this.physics.add.collider(player, obstacles, () => {
          console.log("Player hit an obstacle!");
        });

        cursors = this.input.keyboard.createCursorKeys();
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
      },
    };
    /////// outside first scene object
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
      scene: currentScene === "FirstScene" ? FirstScene : SecondScene, // Dynamic scene based on state
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]); // Depend on the scene state

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
