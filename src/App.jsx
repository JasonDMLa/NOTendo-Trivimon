import { useState } from "react";
import "./App.css";
import PhaserGame from "./components/PhaserGame";
import StartScreen from "./Scenes/StartScreen";
import ThirdScreen from "./Scenes/VideoGameScene";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false); // State to track if the game has started

  return (
    <div className="App">
      {/* {!isGameStarted ? (
        <StartScreen onStart={() => setIsGameStarted(true)} />
      ) : (
        <PhaserGame />
      )} */}
      <PhaserGame />
      {/* <ThirdScreen/> */}
    </div>
  );
}

export default App;
