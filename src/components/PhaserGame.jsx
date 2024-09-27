import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import SecondScene from "./SecondScreen"; // Import your SecondScene component
import ThirdScene from "./ThirdScreen"; // Import additional scenes as needed
import StartScreen from "./StartScreen";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene

  useEffect(() => {
    let player;
    let cursors;
    let background;
    let obstacles;

    const FirstScene = new Phaser.Scene("FirstScene"); // Create a new Phaser Scene

    FirstScene.preload = function () {
      this.load.image("background", "../../public/mock.png");
      this.load.image("playerUp", "../../public/playerUp.png");
      this.load.image("playerDown", "../../public/playerDown.png");
      this.load.image("playerLeft", "../../public/playerLeft.png");
      this.load.image("playerRight", "../../public/playerRight.png");
      this.load.image("tree", "../../public/tree.png");
      this.load.image("teleporter", "../../public/teleporter.png");
      this.load.image("house1", "../../public/house.png");
      this.load.image("house2", "../../public/house2.png");
    };

    // Function to create individual teleporters
    FirstScene.createTeleporter = function (x, y, targetScene, imageKey) {
      const teleporterSprite = this.physics.add.staticImage(x, y, imageKey).setScale(0.1);
      teleporterSprite.body.setSize(teleporterSprite.width * 0.1, teleporterSprite.height * 0.1);
      teleporterSprite.body.setOffset(
        (teleporterSprite.width - teleporterSprite.width * 0.1) / 2,
        (teleporterSprite.height - teleporterSprite.height * 0.1) / 2
      );

      // Player overlaps with teleporter, triggers scene change in React
      this.physics.add.overlap(player, teleporterSprite, () => {
        console.log(`Player hit teleporter leading to ${targetScene}!`);
        setCurrentScene(targetScene); // Trigger scene change
      });
    };

    FirstScene.create = function () {
      background = this.add.image(400, 300, "background").setScale(0.8).setOrigin(0.5, 0.5);
      player = this.physics.add.sprite(400, 300, "playerDown").setScale(0.8);
      player.setCollideWorldBounds(true);

      // Static obstacles group
      obstacles = this.physics.add.staticGroup();
      obstacles.create(515, 293, "tree").setScale(0.5).refreshBody();
      obstacles.create(500, 450, "tree").setScale(0.5).refreshBody();

      // Create individual teleporters
      this.createTeleporter(110, 485, "SecondScene", "teleporter");
      this.createTeleporter(113, 351, "ThirdScene", "house1");
      this.createTeleporter(120, 200, "SecondScene", "house2");

      // Player collides with obstacles
      this.physics.add.collider(player, obstacles, () => {
        console.log("Player hit an obstacle!");
      });

      cursors = this.input.keyboard.createCursorKeys();
    };

    FirstScene.update = function () {
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
      scene: currentScene === "FirstScene"
        ? FirstScene
        : currentScene === "SecondScene"
          ? SecondScene
          : ThirdScene(setCurrentScene), // Handle multiple scenes
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]); // Depend on the scene state

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
