import Phaser from "phaser";
import { getAllVideoGameQuestions } from "../data/videoGamesQuestions"; // Ensure you import this correctly

const VideoGameScene = (setCurrentScene, setVideoGameCompleted,setEnteredVideoGame) => {
  return {
    preload: function () {
      // Preload assets like background image
      this.load.image("background", "../../public/triviaScenes/anotherVG.png"); // Change the path accordingly
      this.load.image("heart", "../../public/triviaScenes/heart.png");
    },

    create: function () {
      // Initialize variables
      setEnteredVideoGame(true)
      this.add.image(400, 300, "background").setScale(1.5).setOrigin(0.5, 0.5);

      let currentQuestionIndex = 0;
      let score = 1;
      let wrongAnswer = 3;
      let correctAnswer = "";
      let heart;
      const allVideoGameQuestions = []; // Use a local variable
      //
      const heartX = 230;
      const enemyHeartY = 40;
      const playerHeartY = 105;
      heart = this.physics.add.staticGroup();
      const enemyHeart1 = heart
        .create(heartX, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart2 = heart
        .create(heartX + 30, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart3 = heart
        .create(heartX + 60, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart4 = heart
        .create(heartX + 90, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart5 = heart
        .create(heartX + 120, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart6 = heart
        .create(heartX + 150, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart7 = heart
        .create(heartX + 180, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart8 = heart
        .create(heartX + 210, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart9 = heart
        .create(heartX + 240, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const enemyHeart10 = heart
        .create(heartX + 270, enemyHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const playerHeart1 = heart
        .create(heartX, playerHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const playerHeart2 = heart
        .create(heartX + 30, playerHeartY, "heart")
        .setScale(0.05)
        .refreshBody();
      const playerHeart3 = heart
        .create(heartX + 60, playerHeartY, "heart")
        .setScale(0.05)
        .refreshBody();

      // Display the score and wrong answer counters
      const scoreText = this.add.text(16, 16, `HP: ${score}/10`, {
        fontSize: "32px",
        fill: "#ff0000",
        backgroundColor: "#000000",
        padding: {
          x: 10,
          y: 10,
        },
      });

      const wrongText = this.add.text(16, 80, `HP: ${wrongAnswer}/3`, {
        fontSize: "32px",
        fill: "#00FF00", // Red text color
        backgroundColor: "#000000",
        padding: {
          x: 10,
          y: 10,
        },
      });

      // Question text display
      const questionText = this.add.text(100, 150, "", {
        fontSize: "28px",
        fill: "#fff",
        wordWrap: { width: 600 },
        backgroundColor: "#000000",
        padding: {
          x: 10,
          y: 10,
        },
      });

      // Create answer buttons and store them in an array
      const answerButtons = [];
      for (let i = 0; i < 4; i++) {
        const button = this.add
          .text(150, 300 + i * 50, "", {
            fontSize: "24px",
            fill: "	#FFFFFF",
            backgroundColor: "#0000CD",
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
          })
          .setInteractive()
          .on("pointerdown", () => checkAnswer(i)); // Add interactivity

        answerButtons.push(button);
      }

      // Load the questions and start the game
      getAllVideoGameQuestions().then((questions) => {
        allVideoGameQuestions.push(...questions); // Populate local questions array
        displayQuestion(); // Display the first question
      });

      // Function to shuffle answers and display the current question
      const displayQuestion = () => {
        if (currentQuestionIndex < allVideoGameQuestions.length) {
          const questionData = allVideoGameQuestions[currentQuestionIndex];
          questionText.setText(questionData.question);

          // Shuffle answers
          const shuffledAnswers = shuffleAnswers(questionData);
          answerButtons.forEach((button, index) => {
            button.setText(shuffledAnswers[index]);
          });

          // Track the correct answer
          correctAnswer = questionData.correctAnswer;
        } else {
          endGame(); // End the game if no more questions
        }
      };

      // Function to shuffle answers
      const shuffleAnswers = (questionData) => {
        const allAnswers = [
          ...questionData.incorrectAnswers,
          questionData.correctAnswer,
        ];

        // Shuffle answers using Fisher-Yates algorithm
        for (let i = allAnswers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }
        return allAnswers;
      };

      // Function to check if the selected answer is correct
      const checkAnswer = (selectedIndex) => {
        const selectedAnswer = answerButtons[selectedIndex].text;

        if (selectedAnswer === correctAnswer) {
          score--;
          scoreText.setText(`HP: ${score}/10`);
        } else {
          wrongAnswer--;
          wrongText.setText(`HP: ${wrongAnswer}/3`);
        }

        if (score === 0) {
          answerButtons.forEach((button) => button.disableInteractive());
          setTimeout(() => {
            setCurrentScene("FirstScene");
            setVideoGameCompleted(true);
          }, 2000); // 2000 ms = 2 seconds
        }

        if (wrongAnswer === 0) {
          answerButtons.forEach((button) => button.disableInteractive());
          setTimeout(() => setCurrentScene("FirstScene"), 1000); // 1 second delay
        }

        const enemyHearts = [
          enemyHeart1,
          enemyHeart2,
          enemyHeart3,
          enemyHeart4,
          enemyHeart5,
          enemyHeart6,
          enemyHeart7,
          enemyHeart8,
          enemyHeart9,
          enemyHeart10,
        ];

        // Make the corresponding heart invisible based on the score
        if (score >= 0 && score <= 9) {
          enemyHearts[score].visible = false;
        }

        const playerHearts = [playerHeart1, playerHeart2, playerHeart3];
        if (wrongAnswer >= 0 && wrongAnswer <= 2) {
          playerHearts[wrongAnswer].visible = false;
        }

        currentQuestionIndex++;
        displayQuestion();
      };

      // Function to end the game
      const endGame = () => {
        this.add.text(150, 500, "Game Over!", {
          fontSize: "48px",
          fill: "#ff0000",
        });

        answerButtons.forEach((button) => button.disableInteractive());
      };

      // Optionally, add a back button to return to another scene
      // const backButton = this.add
      //   .text(400, 500, "Back to Phaser Game", {
      //     fontSize: "32px",
      //     fill: "#fff",
      //     backgroundColor: "#000",
      //   })
      //   .setOrigin(0.5)
      //   .setInteractive();

      // backButton.on("pointerdown", () => {
      //   console.log("Returning to Phaser Game (FirstScene)...");
      //   setCurrentScene("FirstScene"); // Go back to the FirstScene
      // });
    },
  };
};

export default VideoGameScene;
