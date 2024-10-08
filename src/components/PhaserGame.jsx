import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import ScienceScene from "../Scenes/ScienceScene";
import VideoGameScene from "../Scenes/VideoGameScene";
import MusicScene from "../Scenes/MusicScene";
import SportScene from "../Scenes/SportScene";
import HistoryScene from "../Scenes/HistoryScene";
import AnimalScene from "../Scenes/AnimalScene";
import BossScene from "../Scenes/BossScene";
import { setBodySizeAndOffset } from "../utils/setBodySizeAndOffset";
import { addStaticImage } from "../utils/addStaticImage";
import { updateUser, findUser } from "../data/mongoApi";

const PhaserGame = ({ username, saveData, characterSelected }) => {
  
  //////
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene"); // Track current scene
  ////
  const [videoGameCompleted, setVideoGameCompleted] = useState(
    saveData.videoGamesCompleted
  );
  const [scienceCompleted, setScienceCompleted] = useState(
    saveData.scienceCompleted
  );
  const [musicCompleted, setMusicCompleted] = useState(saveData.musicCompleted);
  const [sportCompleted, setSportCompleted] = useState(
    saveData.sportsCompleted
  );
  const [historyCompleted, setHistoryCompleted] = useState(
    saveData.historyCompleted
  );
  const [animalCompleted, setAnimalCompleted] = useState(
    saveData.animalsCompleted
  );
  const [bossCompleted, setBossCompleted] = useState(false)
  ////
  const [scienceQuestionsLoaded, setScienceQuestionsLoaded] = useState(false);
  const [musicQuestionsLoaded, setMusicQuestionsLoaded] = useState(false);
  const [videoGameQuestionsLoaded, setVideoGameQuestionsLoaded] =
    useState(false);
  const [sportQuestionsLoaded, setSportQuestionsLoaded] = useState(false);
  const [historyQuestionsLoaded, setHistoryQuestionsLoaded] = useState(false);
  const [animalQuestionsLoaded, setAnimalQuestionsLoaded] = useState(false);
  const [bossQuestionsLoaded, setBossQuestionsLoaded] = useState(false)
  ////
  let [enteredScience, setEnteredScience] = useState(false);
  let [enteredVideoGame, setEnteredVideoGame] = useState(false);
  let [enteredHistory, setEnteredHistory] = useState(false);
  let [enteredAnimal, setEnteredAnimal] = useState(false);
  let [enteredMusic, setEnteredMusic] = useState(false);
  let [enteredSport, setEnteredSport] = useState(false);
  let [enteredBoss, setEnteredBoss] = useState(false)

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
    let boss;
    let bar;
    let saveButton;

    const FirstScene = {
      preload: function () {
        //////

        this.load.image("background", "../../backgrounds/Trivimon.png");

        this.load.spritesheet(
          "playerUp",
          `../../player/${characterSelected}playerUp.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );
        this.load.spritesheet(
          "playerDown",
          `../../player/${characterSelected}playerDown.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );
        this.load.spritesheet(
          "playerLeft",
          `../../player/${characterSelected}playerLeft.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );
        this.load.spritesheet(
          "playerRight",
          `../../player/${characterSelected}playerRight.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerUpRight",
          `../../player/${characterSelected}playerUpRight.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerDownRight",
          `../../player/${characterSelected}playerDownRight.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerUpLeft",
          `../../player/${characterSelected}playerUpLeft.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerDownLeft",
          `../../player/${characterSelected}playerDownLeft.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.image("tree", "../../tree.png");
        this.load.image("block", "../../collision.png");
        //////
        this.load.image("music", "../../houses/music.png");
        this.load.image("science", "../../houses/science.png");
        this.load.image("videoGame", "../../houses/vgs.png");
        this.load.image("sport", "../../houses/sport.png");
        this.load.image("history", "../../houses/history.png");
        this.load.image("animal", "../../houses/animal.png");
        
        //////
        this.load.image("bar", "../../badges/bar.png");
        this.load.image("musicBadge", "../../badges/musicBadge.png");
        this.load.image("scienceBadge", "../../badges/scienceBadge.png");
        this.load.image("videogameBadge", "../../badges/videogameBadge.png");
        this.load.image("animalBadge", "../../badges/animalBadge.png");
        this.load.image("sportBadge", "../../badges/sportBadge.png");
        this.load.image("historyBadge", "../../badges/historyBadge.png");
        //////
        this.load.audio("backgroundMusic", "../../music/lake.mp3");
        this.load.audio("calmMusic", "../../music/calmMusic.mp3");
      },

      create: function () {
        

        // Set the line style (thickness, color)

        //// cursor
        cursors = this.input.keyboard.createCursorKeys();

        // Your existing create logic for FirstScene
        background = this.add
          .image(0, 0, "background")
          .setScale(2.7)
          .setOrigin(0, 0);
        
        this.music = this.sound.add("calmMusic", {
          loop: true, // Loops the music
          volume: 0, // Set volume (0 to 1)
        });

        this.music.play();

        this.music.setLoop(true);
        this.music.play();

        // Create animations for each direction
        this.anims.create({
          key: "walkDown",
          frames: this.anims.generateFrameNumbers("playerDown", {
            start: 0,
            end: 2,
          }),
          frameRate: 10, // Adjust frame rate for smooth animation
          repeat: -1, // Loop animation
        });

        this.anims.create({
          key: "walkLeft",
          frames: this.anims.generateFrameNumbers("playerLeft", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkRight",
          frames: this.anims.generateFrameNumbers("playerRight", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkUp",
          frames: this.anims.generateFrameNumbers("playerUp", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        // Diagonal directions
        this.anims.create({
          key: "walkUpLeft",
          frames: this.anims.generateFrameNumbers("playerUpLeft", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkUpRight",
          frames: this.anims.generateFrameNumbers("playerUpRight", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkDownLeft",
          frames: this.anims.generateFrameNumbers("playerDownLeft", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkDownRight",
          frames: this.anims.generateFrameNumbers("playerDownRight", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        if (enteredAnimal) {
          this.player = this.physics.add
            .sprite(2220, 1760, "playerDown")
            .setScale(2.5);
        } else if (enteredHistory) {
          this.player = this.physics.add
            .sprite(750, 1410, "playerDown")
            .setScale(2.5);
        } else if (enteredMusic) {
          this.player = this.physics.add
            .sprite(925, 2170, "playerDown")
            .setScale(2.5);
        } else if (enteredVideoGame) {
          this.player = this.physics.add
            .sprite(2800, 1490, "playerDown")
            .setScale(2.5);
        } else if (enteredScience) {
          this.player = this.physics.add
            .sprite(1650, 1070, "playerDown")
            .setScale(2.5);
        } else if (enteredSport) {
          this.player = this.physics.add
            .sprite(2260, 940, "playerDown")
            .setScale(2.5);
        } else {
          this.player = this.physics.add
            .sprite(862, 750, "playerDown")
            .setScale(2.5);
        }
        setEnteredAnimal(false);
        setEnteredMusic(false);
        setEnteredScience(false);
        setEnteredVideoGame(false);
        setEnteredHistory(false);
        setEnteredSport(false);

        this.player.setCollideWorldBounds(false);

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
        this.cameras.main.startFollow(this.player);

        // Create static images using the reusable function
        music = addStaticImage(this, 925, 2100, "music", 0.1);
        science = addStaticImage(this, 1650, 1000, "science", 0.1);
        videoGame = addStaticImage(this, 2800, 1360, "videoGame", 0.1);
        sport = addStaticImage(this, 2260, 870, "sport", 0.1);
        history = addStaticImage(this, 750, 1300, "history", 0.3);
        animal = addStaticImage(this, 2220, 1670, "animal", 0.07);
        boss = addStaticImage(this, 800, 1400, "tree", 0.1)

        // Keep hitbox logic unchanged

        ///////////////
        setBodySizeAndOffset(music, 0.1, 0.1);
        setBodySizeAndOffset(science, 0.1, 0.1);
        setBodySizeAndOffset(videoGame, 0.3, 0.3);
        setBodySizeAndOffset(sport, 0.1, 0.1);
        setBodySizeAndOffset(history, 0.3, 0.3);
        setBodySizeAndOffset(animal, 0.07, 0.07);
        setBodySizeAndOffset(boss, 0.1, 0.1)
        //////
        if (!bossCompleted) {
          this.physics.add.overlap(this.player, boss, () => {
            console.log(
              "Player hit videoGame! Teleporting to videoGameScene..."
            );
            if (!bossQuestionsLoaded) {
              console.log("Loading music questions...");
              setBossQuestionsLoaded(true); // Set loaded to true
              setCurrentScene("BossScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "VideoGame questions already loaded, changing to MusicScene..."
              );
              setCurrentScene("BossScene"); // Change to videogame if already loaded
            }
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticBoss = this.physics.add
            .staticImage(2800, 1360, "tree")
            .setScale(0.1);
            staticBoss.body.setSize(
              staticBoss.width * 0.1,
              staticBoss.height * 0.1
          );
          staticBoss.body.setOffset(
            (staticBoss.width - staticBoss.width * 0.1) / 2,
            (staticBoss.height - staticBoss.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticBoss, () => {
            console.log("Player collided with the static videoGame");
          });
        }


        //////
        if (!videoGameCompleted) {
          this.physics.add.overlap(this.player, videoGame, () => {
            console.log(
              "Player hit videoGame! Teleporting to videoGameScene..."
            );
            if (!videoGameQuestionsLoaded) {
              console.log("Loading music questions...");
              setVideoGameQuestionsLoaded(true); // Set loaded to true
              setCurrentScene("VideoGameScene"); // Change to MusicScene
              //});
            } else {
              console.log(
                "VideoGame questions already loaded, changing to MusicScene..."
              );
              setCurrentScene("VideoGameScene"); // Change to videogame if already loaded
            }
          });
        } else {
          // Keep the logic to handle static videoGame if disabled
          const staticVideoGame = this.physics.add
            .staticImage(2800, 1360, "videoGame")
            .setScale(0.1);
          staticVideoGame.body.setSize(
            staticVideoGame.width * 0.1,
            staticVideoGame.height * 0.1
          );
          staticVideoGame.body.setOffset(
            (staticVideoGame.width - staticVideoGame.width * 0.1) / 2,
            (staticVideoGame.height - staticVideoGame.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticVideoGame, () => {
            console.log("Player collided with the static videoGame");
          });
        }
        //////////////////////////////////////////////////

        if (!scienceCompleted) {
          this.physics.add.overlap(this.player, science, () => {
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
            .staticImage(1650, 1000, "science")
            .setScale(0.1);
          staticScience.body.setSize(
            staticScience.width * 0.1,
            staticScience.height * 0.1
          );
          staticScience.body.setOffset(
            (staticScience.width - staticScience.width * 0.1) / 2,
            (staticScience.height - staticScience.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticScience, () => {
            console.log("Player collided with the static science");
          });
        }

        //////////////////////////

        if (!musicCompleted) {
          this.physics.add.overlap(this.player, music, () => {
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
            .staticImage(925, 2100, "music")
            .setScale(0.1);
          staticMusic.body.setSize(
            staticMusic.width * 0.1,
            staticMusic.height * 0.1
          );
          staticMusic.body.setOffset(
            (staticMusic.width - staticMusic.width * 0.1) / 2,
            (staticMusic.height - staticMusic.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticMusic, () => {
            console.log("Player collided with the static music");
          });
        }
        //////////////////////////////////////////////////
        if (!sportCompleted) {
          this.physics.add.overlap(this.player, sport, () => {
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
            .staticImage(2260, 870, "sport")
            .setScale(0.1);
          staticSport.body.setSize(
            staticSport.width * 0.1,
            staticSport.height * 0.1
          );
          staticSport.body.setOffset(
            (staticSport.width - staticSport.width * 0.1) / 2,
            (staticSport.height - staticSport.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticSport, () => {
            console.log("Player collided with the static sport");
          });
        }

        ///////////////////////

        if (!historyCompleted) {
          setEnteredHistory(false);
          this.physics.add.overlap(this.player, history, () => {
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
            .staticImage(750, 1300, "history")
            .setScale(0.3);
          staticHistory.body.setSize(
            staticHistory.width * 0.3,
            staticHistory.height * 0.3
          );
          staticHistory.body.setOffset(
            (staticHistory.width - staticHistory.width * 0.3) / 2,
            (staticHistory.height - staticHistory.height * 0.3) / 2
          );
          this.physics.add.collider(this.player, staticHistory, () => {
            console.log("Player collided with the static history");
          });
        }
        //////////////////////////////////////////////////

        if (!animalCompleted) {
          this.physics.add.overlap(this.player, animal, () => {
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
            .staticImage(2220, 1670, "animal")
            .setScale(0.07);

          staticAnimal.body.setSize(
            staticAnimal.width * 0.07,
            staticAnimal.height * 0.07
          );
          staticAnimal.body.setOffset(
            (staticAnimal.width - staticAnimal.width * 0.07) / 2,
            (staticAnimal.height - staticAnimal.height * 0.07) / 2
          );
          this.physics.add.collider(this.player, staticAnimal, () => {
            console.log("Player collided with the static animal");
          });
        }

        /////////////////////////////////////////////////

        obstacles = this.physics.add.staticGroup();
        obstacles.create(280, 68, "tree").setScale(0.5).refreshBody();
        obstacles.create(540, 68, "tree").setScale(0.5).refreshBody();

        let block1 = obstacles
          .create(530, 738, "block")
          .setScale(0.5)
          .refreshBody();
        block1.body.setSize(block1.width * 0.07, block1.height * 25);
        let house = obstacles
          .create(860, 535, "block")
          .setScale(0.5)
          .refreshBody();
        house.body.setSize(house.width * 21, house.height * 32);

        // Set position bar
        this.bar = this.add
          .image(700, 600, "bar")
          .setScrollFactor(0)
          .setScale(0.7);

        // Create a group for badges, add them without physics, and set fixed position
        this.badges = this.add.group();
        let badgeX = 700;
        const badgeY = 600;

        if (scienceCompleted) {
          const scienceBadge = this.add
            .image(badgeX - 120, badgeY, "scienceBadge")
            .setScale(0.3)
            .setScrollFactor(0); // Lock to the screen
          this.badges.add(scienceBadge);
        }
        if (sportCompleted) {
          const sportBadge = this.add
            .image(badgeX - 60, badgeY, "sportBadge")
            .setScale(0.3)
            .setScrollFactor(0);
          this.badges.add(sportBadge);
        }
        if (videoGameCompleted) {
          const videogameBadge = this.add
            .image(badgeX - 10, badgeY, "videogameBadge")
            .setScale(0.3)
            .setScrollFactor(0);
          this.badges.add(videogameBadge);
        }
        if (musicCompleted) {
          const musicBadge = this.add
            .image(badgeX + 40, badgeY, "musicBadge")
            .setScale(0.3)
            .setScrollFactor(0);
          this.badges.add(musicBadge);
        }
        if (animalCompleted) {
          const animalBadge = this.add
            .image(badgeX + 100, badgeY, "animalBadge")
            .setScale(0.3)
            .setScrollFactor(0);
          this.badges.add(animalBadge);
        }
        if (historyCompleted) {
          const historyBadge = this.add
            .image(badgeX + 150, badgeY, "historyBadge")
            .setScale(0.3)
            .setScrollFactor(0);
          this.badges.add(historyBadge);
        }

        this.physics.add.collider(this.player, obstacles, () => {
          console.log("Player hit an obstacle!");
        });

        this.coordText = this.add.text(10, 10, "Coordinates: (0, 0)", {
          fontSize: "16px",
          fill: "#ffffff",
        });

        cursors = this.input.keyboard.createCursorKeys();

        saveButton = this.add
          .image(800, 100, "tree")
          .setScrollFactor(0)
          .setScale(0.5)

          .setInteractive();
        saveButton.on("pointerdown", () => {
          updateUser(username, {
            animalsCompleted: animalCompleted,
            historyCompleted,
            musicCompleted,
            scienceCompleted,
            sportsCompleted: sportCompleted,
            videoGamesCompleted: videoGameCompleted,
          });
        });
      },

      update: function () {
        if (!this.player) return;

        this.player.setVelocity(0);

        // Diagonal movement first
        if (cursors.up.isDown && cursors.left.isDown) {
          this.player.setVelocityX(-250);
          this.player.setVelocityY(-250);
          this.player.anims.play("walkUpLeft", true);
        } else if (cursors.up.isDown && cursors.right.isDown) {
          this.player.setVelocityX(250);
          this.player.setVelocityY(-250);
          this.player.anims.play("walkUpRight", true);
        } else if (cursors.down.isDown && cursors.left.isDown) {
          this.player.setVelocityX(-250);
          this.player.setVelocityY(250);
          this.player.anims.play("walkDownLeft", true);
        } else if (cursors.down.isDown && cursors.right.isDown) {
          this.player.setVelocityX(250);
          this.player.setVelocityY(250);
          this.player.anims.play("walkDownRight", true);
        } else {
          // Handle single direction movement
          if (cursors.left.isDown) {
            this.player.setVelocityX(-250);
            this.player.anims.play("walkLeft", true);
          } else if (cursors.right.isDown) {
            this.player.setVelocityX(250);
            this.player.anims.play("walkRight", true);
          }

          if (cursors.up.isDown) {
            this.player.setVelocityY(-250);
            this.player.anims.play("walkUp", true);
          } else if (cursors.down.isDown) {
            this.player.setVelocityY(250);
            this.player.anims.play("walkDown", true);
          }
        }

        // Stop animation when no movement
        if (
          cursors.left.isUp &&
          cursors.right.isUp &&
          cursors.up.isUp &&
          cursors.down.isUp
        ) {
          this.player.anims.stop(); // Stop animation if no keys pressed
        }
        // Update the coordinates display to stick with the player
        this.coordText.setText(
          "Coordinates: (" +
            this.player.x.toFixed(0) +
            ", " +
            this.player.y.toFixed(0) +
            ")"
        );

        // Make the text follow the player by setting its position relative to the player
        this.coordText.setPosition(this.player.x - 50, this.player.y - 50);

        // // Make bar move
        // const camera = this.cameras.main;

        // this.bar.setPosition(camera.scrollX + 700, camera.scrollY + 600);

        // this.badges.getChildren().forEach((badge) => {
        //   // Adjust the badge position based on camera scroll (offset on screen)
        //   badge.setPosition(
        //     camera.scrollX + 700 + badge.initialXOffset, // Adjust based on initial X offset
        //     camera.scrollY + 550 // Fixed Y position
        //   );
        // });

        // const pointer = this.input.activePointer;
        // mouseText.setText(
        //   `Mouse X: ${pointer.worldX.toFixed(
        //     0
        //   )}, Mouse Y: ${pointer.worldY.toFixed(0)}`
        // );
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
          debug: false,
        },
      },
      scene:
        currentScene === "FirstScene" ? (
          FirstScene
        ) : currentScene === "ScienceScene" ? (
          ScienceScene(setCurrentScene, setScienceCompleted, setEnteredScience) // Call your ScienceScene
        ) : currentScene === "VideoGameScene" ? (
          VideoGameScene(
            setCurrentScene,
            setVideoGameCompleted,
            setEnteredVideoGame
          )
        ) : currentScene === "MusicScene" ? (
          MusicScene(setCurrentScene, setMusicCompleted, setEnteredMusic)
        ) : currentScene === "SportScene" ? (
          SportScene(setCurrentScene, setSportCompleted, setEnteredSport)
        ) : currentScene === "HistoryScene" ? (
          HistoryScene(setCurrentScene, setHistoryCompleted, setEnteredHistory)
        ) : currentScene === "AnimalScene" ? (
          AnimalScene(setCurrentScene, setAnimalCompleted, setEnteredAnimal)
        ) : currentScene === "BossScene" ? (
          BossScene(setCurrentScene, setBossCompleted, setEnteredBoss)
        ): (
          <h1>nope</h1>
        ),
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]);

  return <div ref={gameRef}></div>;
};

export default PhaserGame;
