import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import ScienceScene from "../Scenes/ScienceScene"; // Import your ScienceScene component
import VideoGameScene from "../Scenes/VideoGameScene"; // Import your VideoGameScene component
import MusicScene from "../Scenes/MusicScene"

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene
  const [videoGameCompleted, setVideoGameCompleted] = useState(false); // Flag for videoGame teleport
  const [scienceCompleted, setScienceCompleted] = useState(false);
  const [musicCompleted,setMusicCompleted] = useState(false)
  


  // State to track if the right button was clicked in the ScienceScene

  useEffect(() => {
    let player;
    let cursors;
    let background;
    let obstacles;
    let mouseText;
    let music;
    let videoGame;
    let science;

    const FirstScene = {
      preload: function () {
        this.load.image("background", "../../public/backgrounds/mock.png");
        this.load.image("playerUp", "../../public/player/playerUp.png");
        this.load.image("playerDown", "../../public/player/playerDown.png");
        this.load.image("playerLeft", "../../public/player/playerLeft.png");
        this.load.image("playerRight", "../../public/player/playerRight.png");
        this.load.image("tree", "../../public/tree.png");
        this.load.image("music", "../../public/houses/music.png");
        this.load.image("science", "../../public/houses/science.png");
        this.load.image("videoGame", "../../public/houses/vgs.png");
      },

      create: function () {
        // Your existing create logic for FirstScene
        background = this.add
          .image(400, 300, "background")
          .setScale(0.8)
          .setOrigin(0.5, 0.5);
        player = this.physics.add.sprite(400, 300, "playerDown").setScale(0.8);
        player.setCollideWorldBounds(true);

        music = this.physics.add
          .staticImage(110, 485, "music")
          .setScale(0.1);
        science = this.physics.add
          .staticImage(113, 351, "science")
          .setScale(0.1);
        videoGame = this.physics.add
          .staticImage(120, 200, "videoGame")
          .setScale(0.3);
        // Keep hitbox logic unchanged

        music.body.setSize(
          music.width * 0.1,
          music.height * 0.1
        );
        music.body.setOffset(
          (music.width - music.width * 0.1) / 2,
          (music.height - music.height * 0.1) / 2
        );

        science.body.setSize(science.width * 0.1, science.height * 0.1);
        science.body.setOffset(
          (science.width - science.width * 0.1) / 2,
          (science.height - science.height * 0.1) / 2
        );

        videoGame.body.setSize(videoGame.width * 0.3, videoGame.height * 0.3);
        videoGame.body.setOffset(
          (videoGame.width - videoGame.width * 0.3) / 2,
          (videoGame.height - videoGame.height * 0.3) / 2
        );

        if (!videoGameCompleted) {
          this.physics.add.overlap(player, videoGame, () => {
            console.log(
              "Player hit videoGame! Teleporting to videoGameScene..."
            );
            setCurrentScene("VideoGameScene");
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticVideoGame = this.physics.add
            .staticImage(120, 200, "videoGame")
            .setScale(0.3);
          staticVideoGame.body.setSize(
            staticVideoGame.width * 0.3,
            staticVideoGame.height * 0.3
          );
          staticVideoGame.body.setOffset(
            (staticVideoGame.width - staticVideoGame.width * 0.3) / 2,
            (staticVideoGame.height - staticVideoGame.height * 0.3) / 2
          );
          this.physics.add.collider(player, staticVideoGame, () => {
            console.log("Player collided with the static videoGame");
          });
        }
        //////////////////////////////////////////////////

        if (!scienceCompleted) {
          this.physics.add.overlap(player, science, () => {
            console.log("Player hit science! Teleporting to scienceScene...");
            setCurrentScene("ScienceScene");
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticScience = this.physics.add
            .staticImage(113, 351, "science")
            .setScale(0.1);
          staticScience.body.setSize(
            staticScience.width * 0.1,
            staticScience.height * 0.1
          );
          staticScience.body.setOffset(
            (staticScience.width - staticScience.width * 0.1) / 2,
            (staticScience.height - staticScience.height * 0.1) / 2
          );
          this.physics.add.collider(player, staticScience, () => {
            console.log("Player collided with the static Science");
          });
        }
        //////////////////////////

        if (!musicCompleted) {
          this.physics.add.overlap(player, music, () => {
            console.log(
              "Player hit music! Teleporting to musicScene..."
            );
            setCurrentScene("MusicScene");
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticMusic = this.physics.add
            .staticImage(110, 485, "music")
            .setScale(0.1);
            staticMusic.body.setSize(
              staticMusic.width * 0.1,
              staticMusic.height * 0.1
          );
          staticMusic.body.setOffset(
            (staticMusic.width - staticMusic.width * 0.1) / 2,
            (staticMusic.height - staticMusic.height * 0.1) / 2
          );
          this.physics.add.collider(player, staticMusic, () => {
            console.log("Player collided with the static music");
          });
        }
        //////////////////////////////////////////////////

        obstacles = this.physics.add.staticGroup();
        obstacles.create(515, 293, "tree").setScale(0.5).refreshBody();
        obstacles.create(500, 450, "tree").setScale(0.5).refreshBody();

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
          : currentScene === "ScienceScene"
          ? ScienceScene(setCurrentScene, setScienceCompleted) // Call your ScienceScene here
          : currentScene === "VideoGameScene"
          ? VideoGameScene(setCurrentScene, setVideoGameCompleted)
          : currentScene === "MusicScene"
          ? MusicScene(setCurrentScene, setMusicCompleted)// Call VideoGameScene here
          : <h1>nope</h1>
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]); // Added videoGameCompleted to dependencies

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
