import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import ScienceScene from "../Scenes/ScienceScene"; // Import your ScienceScene component
import VideoGameScene from "../Scenes/VideoGameScene"; // Import your VideoGameScene component
import MusicScene from "../Scenes/MusicScene";
import SportScene from "../Scenes/SportScene";
import HistoryScene from "../Scenes/HistoryScene";
import AnimalScene from "../Scenes/AnimalScene";
import { setBodySizeAndOffset } from "../utils/setBodySizeAndOffset";
import { addStaticImage } from "../utils/addStaticImage";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene
  ////
  const [videoGameCompleted, setVideoGameCompleted] = useState(false); // Flag for videoGame teleport
  const [scienceCompleted, setScienceCompleted] = useState(false);
  const [musicCompleted, setMusicCompleted] = useState(false);
  const [sportCompleted, setSportCompleted] = useState(false);
  const [historyCompleted, setHistoryCompleted] = useState(false);
  const [animalCompleted, setAnimalCompleted] = useState(false);
  ////
  const [scienceQuestionsLoaded, setScienceQuestionsLoaded] = useState(false);
  const [musicQuestionsLoaded, setMusicQuestionsLoaded] = useState(false);
  const [videoGameQuestionsLoaded, setVideoGameQuestionsLoaded] =
    useState(false);
  const [sportQuestionsLoaded, setSportQuestionsLoaded] = useState(false);
  const [historyQuestionsLoaded, setHistoryQuestionsLoaded] = useState(false);
  const [animalQuestionsLoaded, setAnimalQuestionsLoaded] = useState(false);
  // State to track if the right button was clicked in the ScienceScene

  useEffect(() => {
    let player;
    let badges;
    let cursors;
    let background;
    let obstacles;
    let mouseText;
    let music;
    let videoGame;
    let science;
    let sport;
    let history;
    let animal;
    let bar;

    const FirstScene = {
      preload: function () {
        this.load.image("background", "../../public/backgrounds/Trivimon.png");
        this.load.image("playerUp", "../../public/player/playerUp.png");
        this.load.image("playerDown", "../../public/player/playerDown.png");
        this.load.image("playerLeft", "../../public/player/playerLeft.png");
        this.load.image("playerRight", "../../public/player/playerRight.png");
        this.load.image("tree", "../../public/tree.png");
        this.load.image("music", "../../public/houses/music.png");
        this.load.image("science", "../../public/houses/science.png");
        this.load.image("videoGame", "../../public/houses/vgs.png");
        this.load.image("sport", "../../public/houses/sport.png");
        this.load.image("history", "../../public/houses/history.png");
        this.load.image("animal", "../../public/houses/animal.png");
        this.load.image("bar", "../../public/badges/bar.png");
      },

      create: function () {
        //// cursor
        cursors = this.input.keyboard.createCursorKeys();




        // Your existing create logic for FirstScene
        background = this.add
          .image(0, 0, "background")
          .setScale(2.7)
          .setOrigin(0, 0);

        player = this.physics.add.sprite(400, 300, "playerDown").setScale(0.8);
        player.setCollideWorldBounds(false);

        mouseText = this.add.text(10, 10, "", {
          font: "16px Courier",
          fill: "#ffffff",
        });
        // Set camera bounds to match the background size
        this.cameras.main.setBounds(
          0,
          0,
          background.width * 2.7,
          background.height * 2.7
        );
        // Make the camera follow the player
        this.cameras.main.startFollow(player);

        // Create static images using the reusable function
        music = addStaticImage(this, 190, 580, "music", 0.1);
        science = addStaticImage(this, 190, 390, "science", 0.1);
        videoGame = addStaticImage(this, 120, 200, "videoGame", 0.3);
        sport = addStaticImage(this, 610, 160, "sport", 0.1);
        history = addStaticImage(this, 617, 352, "history", 0.3);
        animal = addStaticImage(this, 610, 580, "animal", 0.07);

        // Keep hitbox logic unchanged

        ///////////////
        setBodySizeAndOffset(music, 0.1, 0.1);
        setBodySizeAndOffset(science, 0.1, 0.1);
        setBodySizeAndOffset(videoGame, 0.3, 0.3);
        setBodySizeAndOffset(sport, 0.1, 0.1);
        setBodySizeAndOffset(history, 0.3, 0.3);
        setBodySizeAndOffset(animal, 0.07, 0.07);

        if (!videoGameCompleted) {
          this.physics.add.overlap(player, videoGame, () => {
            console.log(
              "Player hit videoGame! Teleporting to videoGameScene..."
            );
            if (!videoGameQuestionsLoaded) {
              console.log("Loading music questions...");
              setVideoGameQuestionsLoaded(true); // Set flag to true
              setCurrentScene("VideoGameScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "VideoGame questions already loaded, changing to MusicScene..."
              );
              setCurrentScene("VideoGameScene"); // Change to MusicScene if already loaded
            }
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
            if (!scienceQuestionsLoaded) {
              console.log("Loading music questions...");
              setScienceQuestionsLoaded(true); // Set flag to true
              setCurrentScene("ScienceScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "Science questions already loaded, changing to MusicScene..."
              );
              setCurrentScene("ScienceScene"); // Change to MusicScene if already loaded
            }
          });
        } else {
          // Keep the logic to handle static science if disabled
          const staticScience = this.physics.add
            .staticImage(190, 390, "science")
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
            console.log("Player collided with the static science");
          });
        }

        //////////////////////////

        if (!musicCompleted) {
          this.physics.add.overlap(player, music, () => {
            console.log("Player hit music! Teleporting to musicScene...");
            if (!musicQuestionsLoaded) {
              console.log("Loading music questions...");
              setMusicQuestionsLoaded(true); // Set flag to true
              setCurrentScene("MusicScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "Music questions already loaded, changing to MusicScene..."
              );
              setCurrentScene("MusicScene"); // Change to MusicScene if already loaded
            }
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticMusic = this.physics.add
            .staticImage(190, 580, "music")
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
        if (!sportCompleted) {
          this.physics.add.overlap(player, sport, () => {
            console.log("Player hit sport! Teleporting to sportScene...");
            if (!sportQuestionsLoaded) {
              console.log("Loading sport questions...");
              setSportQuestionsLoaded(true); // Set flag to true
              setCurrentScene("SportScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "sport questions already loaded, changing to SportScene..."
              );
              setCurrentScene("SportScene"); // Change to MusicScene if already loaded
            }
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticSport = this.physics.add
            .staticImage(610, 160, "sport")
            .setScale(0.1);
          staticSport.body.setSize(
            staticSport.width * 0.1,
            staticSport.height * 0.1
          );
          staticSport.body.setOffset(
            (staticSport.width - staticSport.width * 0.1) / 2,
            (staticSport.height - staticSport.height * 0.1) / 2
          );
          this.physics.add.collider(player, staticSport, () => {
            console.log("Player collided with the static sport");
          });
        }

        ///////////////////////

        if (!historyCompleted) {
          this.physics.add.overlap(player, history, () => {
            console.log("Player hit history! Teleporting to HistoryScene...");
            if (!historyQuestionsLoaded) {
              console.log("Loading history questions...");
              setHistoryQuestionsLoaded(true); // Set flag to true
              setCurrentScene("HistoryScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "History questions already loaded, changing to HistoryScene..."
              );
              setCurrentScene("HistoryScene"); // Change to MusicScene if already loaded
            }
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticHistory = this.physics.add
            .staticImage(617, 352, "history")
            .setScale(0.3);
          staticHistory.body.setSize(
            staticHistory.width * 0.3,
            staticHistory.height * 0.3
          );
          staticHistory.body.setOffset(
            (staticHistory.width - staticHistory.width * 0.3) / 2,
            (staticHistory.height - staticHistory.height * 0.3) / 2
          );
          this.physics.add.collider(player, staticHistory, () => {
            console.log("Player collided with the static history");
          });
        }
        //////////////////////////////////////////////////

        if (!animalCompleted) {
          this.physics.add.overlap(player, animal, () => {
            console.log("Player hit animal! Teleporting to animalScene...");
            if (!animalQuestionsLoaded) {
              console.log("Loading music questions...");
              setAnimalQuestionsLoaded(true); // Set flag to true
              setCurrentScene("AnimalScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "Animal questions already loaded, changing to MusicScene..."
              );
              setCurrentScene("AnimalScene"); // Change to MusicScene if already loaded
            }
          });
        } else {
          // Keep the logic to handle static animal if disabled
          const staticAnimal = this.physics.add
            .staticImage(610, 580, "animal")
            .setScale(0.07);

          staticAnimal.body.setSize(
            staticAnimal.width * 0.07,
            staticAnimal.height * 0.07
          );
          staticAnimal.body.setOffset(
            (staticAnimal.width - staticAnimal.width * 0.07) / 2,
            (staticAnimal.height - staticAnimal.height * 0.07) / 2
          );
          this.physics.add.collider(player, staticAnimal, () => {
            console.log("Player collided with the static animal");
          });
        }

        /////////////////////////////////////////////////

        bar = this.physics.add.staticImage(350, 600, "bar").setScale(0.7);

        bar.body.setSize(bar.width * 0.7, bar.height * 0.4);
        bar.body.setOffset(
          (bar.width - bar.width * 0.7) / 2,
          (bar.height - bar.height * 0.4) / 2
        );

        obstacles = this.physics.add.staticGroup();
        obstacles.create(280, 68, "tree").setScale(0.5).refreshBody();
        obstacles.create(540, 68, "tree").setScale(0.5).refreshBody();

        const badgeX = 204;
        const badgeY = 553;

        badges = this.physics.add.staticGroup();
        if (scienceCompleted) {
          badges.create(badgeX, badgeY, "science").setScale(0.1).refreshBody();
        }
        if (sportCompleted) {
          badges
            .create(badgeX + 70, badgeY, "sport")
            .setScale(0.1)
            .refreshBody();
        }
        if (videoGameCompleted) {
          badges
            .create(badgeX + 140, badgeY, "videoGame")
            .setScale(0.1)
            .refreshBody();
        }
        if (musicCompleted) {
          badges
            .create(badgeX + 210, badgeY, "music")
            .setScale(0.1)
            .refreshBody();
        }
        if (animalCompleted) {
          badges
            .create(badgeX + 280, badgeY, "animal")
            .setScale(0.1)
            .refreshBody();
        }
        if (historyCompleted) {
          badges
            .create(badgeX + 350, badgeY, "history")
            .setScale(0.1)
            .refreshBody();
        }
        // badges.create(540, 68, "sports").setScale(0.5).refreshBody();

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
      width: 1000,
      height: 650,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      scene:
        currentScene === "FirstScene" ? (
          FirstScene
        ) : currentScene === "ScienceScene" ? (
          ScienceScene(setCurrentScene, setScienceCompleted) // Call your ScienceScene here
        ) : currentScene === "VideoGameScene" ? (
          VideoGameScene(setCurrentScene, setVideoGameCompleted)
        ) : currentScene === "MusicScene" ? (
          MusicScene(setCurrentScene, setMusicCompleted) // Call VideoGameScene here
        ) : currentScene === "SportScene" ? (
          SportScene(setCurrentScene, setSportCompleted) // Call VideoGameScene here
        ) : currentScene === "HistoryScene" ? (
          HistoryScene(setCurrentScene, setHistoryCompleted) // Call VideoGameScene here (
        ) : currentScene === "AnimalScene" ? (
          AnimalScene(setCurrentScene, setAnimalCompleted)
        ) : (
          <h1>nope</h1>
        ),
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]); // Added sportCompleted to dependencies

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
