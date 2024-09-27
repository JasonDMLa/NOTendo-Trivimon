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

    const FirstScene = {
      preload: function () {
        this.load.image("background", "../../public/pokeman.png");
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
        obstacles.create(515, 293, "tree").setScale(0.5).refreshBody();
        obstacles.create(500, 450, "tree").setScale(0.5).refreshBody();

        // Teleporter configuration with target scenes
        const teleporterConfig = {
          scale: 0.1, // Scale for the teleporters
          hitboxScale: 0.1, // Hitbox scale factor
          teleporters: [
            { x: 110, y: 485, scene: "SecondScene" },
            { x: 113, y: 351, scene: "ThirdScene" },
            { x: 120, y: 200, scene: "SecondScene" },
          ],
        };

        // Add teleporters
        teleporterConfig.teleporters.forEach((teleporter) => {
          const teleporterSprite = this.physics.add
            .staticImage(teleporter.x, teleporter.y, "teleporter")
            .setScale(teleporterConfig.scale);

          teleporterSprite.body.setSize(
            teleporterSprite.width * teleporterConfig.hitboxScale,
            teleporterSprite.height * teleporterConfig.hitboxScale
          );

          teleporterSprite.body.setOffset(
            (teleporterSprite.width - teleporterSprite.width * teleporterConfig.hitboxScale) / 2,
            (teleporterSprite.height - teleporterSprite.height * teleporterConfig.hitboxScale) / 2
          );

          // Player overlaps with teleporter, triggers scene change in React
          this.physics.add.overlap(player, teleporterSprite, () => {
            console.log(`Player hit teleporter leading to ${teleporter.scene}!`);
            setCurrentScene(teleporter.scene); // Trigger scene change
          });
        });

        // Player collides with obstacles
        this.physics.add.collider(player, obstacles, () => {
          console.log("Player hit an obstacle!");
        });

        cursors = this.input.keyboard.createCursorKeys();

        const coordinatesText = this.add.text(10, 10, 'Mouse: (0, 0)', {
          fontSize: '16px',
          fill: '#fff',
          backgroundColor: '#000',
      });
  
      // Update the text with the mouse coordinates on pointer move
      this.input.on('pointermove', (pointer) => {
          coordinatesText.setText(`Mouse: (${pointer.x}, ${pointer.y})`);
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
      scene: currentScene === "FirstScene" ? FirstScene : currentScene === "SecondScene" ? SecondScene : ThirdScene, // Handle multiple scenes
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]); // Depend on the scene state

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
