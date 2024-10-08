import { useState } from "react";
import "./App.css";
import PhaserGame from "./components/PhaserGame";
import LoginAccount from "./components/LoginAccount";
import { Create } from "phaser";
import CreateAccount from "./components/CreateAccount";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false); // State to track if the game has started
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveData, setSaveData] = useState({});
  const [characterSelected, setCharacterSelected] = useState("A");
  const handleLoginSuccess = () => {
    setIsGameStarted(true); // Change the state to start the game
  };

  return (
    
    <div className="App">
      <img src = "../public/NOTendo_cropped.png"/>
      {!isGameStarted ? (
        <LoginAccount
          onStart={handleLoginSuccess}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setSaveData={setSaveData}
          setCharacterSelected={setCharacterSelected}
        />
      ) : (
        <PhaserGame
          username={username}
          saveData={saveData}
          characterSelected={characterSelected}
        />
      )}
    </div>
  );
}

export default App;
