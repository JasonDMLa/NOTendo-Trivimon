import { useState } from "react";
import "./App.css";
import PhaserGame from "./components/PhaserGame";
import LoginAccount from "./components/LoginAccount";
import { Create } from "phaser";
import CreateAccount from "./components/CreateAccount";
import CharacterSelection from "./components/CharacterSelection";
import DisplayBox from "./components/DisplayBox";


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false); // State to track if the game has started
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveData, setSaveData] = useState({});
  const [characterSelected,setCharacterSelected] = useState("A")
  const handleLoginSuccess = () => {
    setIsGameStarted(true); // Change the state to start the game
  };
  const [displayText, setDisplayText] = useState("Welcome to the game!");

  return (
    <div className="App">
      {/* <CharacterSelection/> */}
      {/* <CreateAccount/> */}

      {/* <PhaserGame/> */}
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
        <div className="app-container">
        <PhaserGame username={username} saveData={saveData} characterSelected={characterSelected} setDisplayText={setDisplayText}/>
        <DisplayBox text={displayText}/>
        </div>
      )
      
      
      }
    </div>
  );
}

export default App;
