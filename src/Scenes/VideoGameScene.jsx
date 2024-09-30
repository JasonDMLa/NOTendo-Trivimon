import Phaser from "phaser";
import { getAllVideoGameQuestions } from "../data/videoGamesQuestions"; // Import your questions

const VideoGameScene = (setCurrentScene, setVideoGameCompleted) => {
  let currentQuestionIndex = 0;
  let score = 0;
  let correctAnswer = "";
  let wrongAnswer = 0;
  const allVideoGameQuestions = []; // Keep this as an array to store questions

  return {
    preload: function () {
      // Preload assets like background image
      this.load.image("background", "../../public/backgrounds/pokeman.jpg");
    },

    create: function () {
      // Add background image
      this.add.image(0, 0, "background").setOrigin(0); // Set background position

      // Display the score and wrong answer counters
      const scoreText = this.add.text(16, 16, `Score: ${score}`, {
        fontSize: "32px",
        fill: "#fff",
      });

      const wrongText = this.add.text(16, 80, `Wrong: ${wrongAnswer}`, {
        fontSize: "32px",
        fill: "#fff",
      });

      // Question text display
      const questionText = this.add.text(100, 200, "", {
        fontSize: "28px",
        fill: "#fff",
        wordWrap: { width: 600 }, // Wrap text to fit within the game window
      });

      // Create answer buttons and store them in an array
      const answerButtons = [];
      for (let i = 0; i < 4; i++) {
        const button = this.add
          .text(150, 300 + i * 50, "", {
            fontSize: "24px",
            fill: "#fff",
            backgroundColor: "#007bff",
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
        const questionData = allVideoGameQuestions[currentQuestionIndex];
        questionText.setText(questionData.question);

        // Shuffle answers
        const shuffledAnswers = shuffleAnswers(questionData);
        answerButtons.forEach((button, index) => {
          button.setText(shuffledAnswers[index]);
        });

        // Track the correct answer
        correctAnswer = questionData.correctAnswer;
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
          score++;
          scoreText.setText(`Score: ${score}`);
        } else {
          wrongAnswer++;
          wrongText.setText(`Wrong: ${wrongAnswer}`);
        }

        // Check for completion conditions
        if (score === 2) {
          setCompletion(true);
        } else if (wrongAnswer === 14) {
          endGame();
        } else {
          // Move to the next question
          if (currentQuestionIndex < allVideoGameQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
          } else {
            endGame();
          }
        }
      };

      // Function to handle game completion
      const setCompletion = (completed) => {
        answerButtons.forEach((button) => button.disableInteractive());
        setVideoGameCompleted(completed);
        setTimeout(() => setCurrentScene("FirstScene"), 2000); // 2 seconds delay
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
      const backButton = this.add
        .text(400, 500, "Back to Phaser Game", {
          fontSize: "32px",
          fill: "#fff",
          backgroundColor: "#000",
        })
        .setOrigin(0.5)
        .setInteractive();

      backButton.on("pointerdown", () => {
        console.log("Returning to Phaser Game (FirstScene)...");
        setCurrentScene("FirstScene"); // Go back to the FirstScene
      });
    },
  };
};

export default VideoGameScene;
