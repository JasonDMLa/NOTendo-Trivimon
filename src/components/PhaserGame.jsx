import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import SecondScene from "./SecondScreen";
import ThirdScene from "./ThirdScreen";
import StartScreen from "./StartScreen";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene");
  const [hasBadge, setHasBadge] = useState(false);

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
        this.load.image("tree", "../../public/tree.png");
        this.load.image("teleporter", "../../public/teleporter.png");
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

        const teleporterConfig = {
          scale: 0.1,
          hitboxScale: 0.1,
          teleporters: [
            { x: 110, y: 485, scene: "SecondScene" },
            { x: 113, y: 351, scene: "ThirdScene" },
            { x: 120, y: 200, scene: "SecondScene" },
          ],
        };

        teleporterConfig.teleporters.forEach((teleporter) => {
          const teleporterSprite = this.physics.add
            .staticImage(teleporter.x, teleporter.y, "teleporter")
            .setScale(teleporterConfig.scale);
          teleporterSprite.body.setSize(
            teleporterSprite.width * teleporterConfig.hitboxScale,
            teleporterSprite.height * teleporterConfig.hitboxScale
          );
          teleporterSprite.body.setOffset(
            (teleporterSprite.width -
              teleporterSprite.width * teleporterConfig.hitboxScale) /
              2,
            (teleporterSprite.height -
              teleporterSprite.height * teleporterConfig.hitboxScale) /
              2
          );

          this.physics.add.overlap(player, teleporterSprite, () => {
            if (hasBadge || teleporter.scene !== "ThirdScene") {
              console.log(
                `Player hit teleporter leading to ${teleporter.scene}!`
              );
              setCurrentScene(teleporter.scene);
            } else {
              console.log("You need a badge to enter this area!");
            }
          });
        });

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
          debug: true,
        },
      },
      scene:
        currentScene === "FirstScene"
          ? FirstScene
          : currentScene === "SecondScene"
          ? new SecondScene(setCurrentScene, setHasBadge)
          : new ThirdScene(setCurrentScene, setHasBadge),
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene, hasBadge]);

  return <div ref={gameRef} />;
};

export default PhaserGame;
