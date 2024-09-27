import { useState } from 'react';
import './App.css';
import PhaserGame from './components/PhaserGame';
import StartScreen from './components/StartScreen';
import ThirdScreen from './components/ThirdScreen';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false); // State to track if the game has started

  return (
    <div className="App">
      {/* {!isGameStarted ? (
        <StartScreen onStart={() => setIsGameStarted(true)} />
      ) : (
        <PhaserGame />
      )} */}
      <PhaserGame/>
      {/* <ThirdScreen/> */}
    </div>
  );
}

export default App;
