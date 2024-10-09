import { getAllMusicQuestions } from "../data/musicQuestions.js"; // Ensure you import this correctly

const MusicScene = (setCurrentScene, setMusicCompleted, setEnteredMusic) => {
  return {
    preload: function () {
      // Preload assets like background image
      this.load.image("background", "../../public/triviaScenes/music.png");
      this.load.image("displayBox", "../../public/triviaScenes/displayBox.png");
      this.load.audio("correct", "../../music/correct.mp3");
      this.load.audio("wrong","../../music/wrong.mp3")
      this.load.audio("win","../../music/win.mp3")
      this.load.audio("fail","../../music/fail.mp3")
      this.load.image("HP", "../triviaScenes/GymHealth.png");
      this.load.image("HP1", "../triviaScenes/heartbar1.png");
      this.load.image("HP2", "../triviaScenes/heartbar.png");
      this.load.image("HP3", "../triviaScenes/heartbarend.png");
      this.load.image("PHP", "../triviaScenes/PlayerBar.png");
      this.load.image("PHP1", "../triviaScenes/playerBar1.png");
      this.load.image("PHP2", "../triviaScenes/playerBar2.png");
      this.load.image("PHP3", "../triviaScenes/playerBar3.png");
    },

    create: function () {
      // Initialize variables
      setEnteredMusic(true);
      this.add.image(400, 300, "background").setScale(1.73).setOrigin(0.5, 0.5);
      this.add.image(445, 230, "displayBox").setScale(0.57).setOrigin(0.5, 0.5);
      this.add.image(150, 40, "HP").setScale(0.3).setOrigin(0.5, 0.5);
      this.add.image(140, 100, "PHP").setScale(0.3).setOrigin(0.5, 0.5);

      let currentQuestionIndex = 0;
      let score = 10;
      let wrongAnswer = 3;
      let correctAnswer = "";
      let heart;
      const allMusicQuestions = []; // Use a local variable
      //
      const heartX = 87;
      const enemyHeartY = 38;
      const playerHeartY = 97;
      heart = this.physics.add.staticGroup();
      const enemyHeart1 = heart
        .create(heartX, enemyHeartY, "HP1")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart2 = heart
        .create(heartX + 20, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart3 = heart
        .create(heartX + 39, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart4 = heart
        .create(heartX + 58, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart5 = heart
        .create(heartX + 77, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart6 = heart
        .create(heartX + 96, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart7 = heart
        .create(heartX + 115, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart8 = heart
        .create(heartX + 134, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart9 = heart
        .create(heartX + 153, enemyHeartY, "HP2")
        .setScale(0.31)
        .refreshBody();
      const enemyHeart10 = heart
        .create(heartX + 174, enemyHeartY, "HP3")
        .setScale(0.31)
        .refreshBody();
      //////////
      const playerHeart1 = heart
        .create(heartX + 20, playerHeartY, "PHP1")
        .setScale(0.31)
        .refreshBody();
      const playerHeart2 = heart
        .create(heartX + 77, playerHeartY, "PHP2")
        .setScale(0.31)
        .refreshBody();
      const playerHeart3 = heart
        .create(heartX + 135, playerHeartY, "PHP3")
        .setScale(0.31)
        .refreshBody();

      // Question text display
      const questionText = this.add.text(100, 150, "", {
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
          .text(70, y, `${letter}. `, {
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
      getAllMusicQuestions().then((questions) => {
        allMusicQuestions.push(...questions); // Populate local questions array
        displayQuestion(); // Display the first question
      });

      // Function to shuffle answers and display the current question
      const displayQuestion = () => {
        if (currentQuestionIndex < allMusicQuestions.length) {
          const questionData = allMusicQuestions[currentQuestionIndex];
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
        const selectedAnswer = answerButtons[selectedIndex].text.slice(3);

        if (selectedAnswer === correctAnswer) {
          this.music = this.sound.add("correct", {
            loop: false, // Loops the music
            volume: 0.5, // Set volume (0 to 1)

          });
  
          this.music.play();
          score--;
        } else {
          this.music = this.sound.add("wrong", {
            loop: false, // Loops the music
            volume: 0.5, // Set volume (0 to 1)

          });
  
          this.music.play();
          wrongAnswer--;
        }

        if (score === 0) {
          this.music = this.sound.add("win", {
            loop: false, // Loops the music
            volume: 0.5, // Set volume (0 to 1)

          });
          this.music.play();
          answerButtons.forEach((button) => button.disableInteractive());
          setTimeout(() => {
            setCurrentScene("FirstScene");
            setMusicCompleted(true);
          }, 2000); // 2000 ms = 2 seconds
        }

        if (wrongAnswer === 0) {
          this.music = this.sound.add("fail", {
            loop: false, // Loops the music
            volume: 0.5, // Set volume (0 to 1)

          });
          this.music.play();
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
        setHistoryCompleted(true); // Mark history badge as completed
        setCurrentScene("FirstScene"); // Return to the main scene
      };
    },
  };
};

export default MusicScene;
