import { getAllHistoryQuestions } from "../data/historyQuestions.js";

const HistoryScene = (setCurrentScene, setHistoryCompleted,setEnteredHistory) => {
  return {
    preload: function () {
      // Preload assets like background image
      this.load.image("background", "../../public/triviaScenes/history.png");
      this.load.image("heart", "../../public/triviaScenes/heart.png");
      this.load.image("displayBox", "../../public/triviaScenes/displayBox.png");
    },

    create: function () {
      // Initialize variables


      this.add.image(400, 300, "background").setScale(1.4).setOrigin(0.5, 0.5);
      this.add.image(490, 230, "displayBox").setScale(0.57).setOrigin(0.5, 0.5);



      setEnteredHistory(true)

     // this.add.image(400, 230, "displayBox").setScale(0.58).setOrigin(0.5, 0.5);



      let currentQuestionIndex = 0;
      let score = 1;
      let wrongAnswer = 3;
      let correctAnswer = "";
      let heart;
      const allHistoryQuestions = []; // Use a local variable

      const heartX = 220;
      const enemyHeartY = 35;
      const playerHeartY = 100;
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
        fontSize: "25px",
        fill: "#ff0000",
        backgroundColor: "#000000",
        padding: {
          x: 10,
          y: 10,
        },
      });

      const wrongText = this.add.text(16, 80, `HP: ${wrongAnswer}/3`, {
        fontSize: "25px",
        fill: "#00FF00", // Green text color
        backgroundColor: "#000000",
        padding: {
          x: 10,
          y: 10,
        },
      });

      // Question text display
      const questionText = this.add.text(150, 150, "", {
        fontSize: "28px",
        fill: "#fff",
        wordWrap: { width: 700 },
        backgroundColor: "#000000",
        padding: {
          x: 5,
          y: 5,
        },
        stroke: "#FFF",
        strokeThickness: 1.2,
      });

      // Create answer buttons and store them in an array
      const answerButtons = [];
      const buttonPadding = 20; // Padding between buttons
      const buttonYStart = 350; // Starting Y position for the first button

      for (let i = 0; i < 4; i++) {
        const letter = String.fromCharCode(65 + i); // Convert index to letter (A, B, C, D)

        // Dynamically calculate vertical positions for buttons (one below the other)
        const y = buttonYStart + i * (buttonPadding + 40); // Spacing between buttons

        // Create the button with the letter label (A, B, C, D)
        const button = this.add
          .text(120, y, `${letter}. `, {
            fontSize: "24px",
            fill: "#fff",
            backgroundColor: "#007bff",
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            stroke: "#FFF",
            strokeThickness: 1.2,
          })
          .setInteractive()
          .on("pointerdown", () => checkAnswer(i));

        // Store letter for later use
        button.letter = letter;
        answerButtons.push(button);
      }

      // Load the questions and start the game
      getAllHistoryQuestions().then((questions) => {
        allHistoryQuestions.push(...questions); // Populate local questions array
        displayQuestion(); // Display the first question
      });

      // Function to shuffle answers and display the current question
      const displayQuestion = () => {
        if (currentQuestionIndex < allHistoryQuestions.length) {
          const questionData = allHistoryQuestions[currentQuestionIndex];
          questionText.setText(questionData.question);

          // Shuffle answers
          const shuffledAnswers = shuffleAnswers(questionData);
          answerButtons.forEach((button, index) => {
            // Append the letter (A, B, C, D) to the shuffled answer
            button.setText(`${button.letter}. ${shuffledAnswers[index]}`);
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
        const selectedAnswer = answerButtons[selectedIndex].text.slice(3); // Extract the actual answer (without the letter)

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
            setHistoryCompleted(true);
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
        displayQuestion(); // Display the next question
      };

      const endGame = () => {
        setHistoryCompleted(true); // Mark history badge as completed
        setCurrentScene("FirstScene"); // Return to the main scene
      };
    },
  };
};

export default HistoryScene;
