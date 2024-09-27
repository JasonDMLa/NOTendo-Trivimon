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

        // Teleporter configuration
        const teleporterConfig = {
          scale: 0.1, // Scale for the teleporters
          hitboxScale: 0.1, // Hitbox scale factor
          positions: [
            { x: 500, y: 100, name: "teleporter1" },
            { x: 300, y: 400, name: "teleporter2" },
            { x: 700, y: 150, name: "teleporter3" },
          ],
        };

        // Add teleporters
        teleporterConfig.positions.forEach((pos) => {
          const teleporter = this.physics.add
            .staticImage(pos.x, pos.y, "teleporter")
            .setScale(teleporterConfig.scale);

          teleporter.body.setSize(
            teleporter.width * teleporterConfig.hitboxScale,
            teleporter.height * teleporterConfig.hitboxScale
          );

          teleporter.body.setOffset(
            (teleporter.width - teleporter.width * teleporterConfig.hitboxScale) / 2,
            (teleporter.height - teleporter.height * teleporterConfig.hitboxScale) / 2
          );

          // Player overlaps with teleporter, triggers scene change in React
          this.physics.add.overlap(player, teleporter, () => {
            console.log(`Player hit ${pos.name}!`);
            setCurrentScene("SecondScene"); // Trigger scene change
          });
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
