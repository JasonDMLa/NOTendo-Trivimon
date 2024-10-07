import { useState } from "react";
import "./App.css";
import PhaserGame from "./components/PhaserGame";
import LoginAccount from "./components/LoginAccount";
import { Create } from "phaser";
import CreateAccount from "./components/CreateAccount";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false); // State to track if the game has started
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveData, setSaveData] = useState({});
  const handleLoginSuccess = () => {
    setIsGameStarted(true); // Change the state to start the game
  };

  return (
    <div className="App">
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
        />
      ) : (
        <PhaserGame username={username} saveData={saveData} />
      )}
    </div>
  );
}

export default App;
