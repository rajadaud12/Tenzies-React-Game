import Dice from "./components/dice";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [diceState, setDiceState] = React.useState(generateRandomDices());
  const [tenzies, setTenzies] = React.useState(false);
  const [tries, setTries] = React.useState(0);
  const [personalBest, setPersonalBest] = React.useState(() => {
    const savedBest = localStorage.getItem('personalBest');
    return savedBest ? parseInt(savedBest, 10) : Infinity;
  });

  
  React.useEffect(() => {
    checkGameEnd();
  }, [diceState]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function checkGameEnd() {
    for (let i = 0; i < diceState.length - 1; i++) {
      if (diceState[i].value !== diceState[i + 1].value || !diceState[i].isHeld) return;
    }
    setTenzies(true);
    setTries(prevTries => {
      if (prevTries < personalBest) {
        const newPersonalBest = prevTries;
        setPersonalBest(newPersonalBest);
        localStorage.setItem('personalBest', newPersonalBest.toString());
      }
      return prevTries;
    });
    console.log("You won");
  }

  function generateRandomDices() {
    const randomArray = [];
    for (let i = 0; i < 10; i++) {
      randomArray.push(generateNewDie());
    }
    console.log(randomArray);
    return randomArray;
  }

  function rollAgain() {
    if (!tenzies) {
      setDiceState(prevDiceState => prevDiceState.map(die => (
        die.isHeld ? die : generateNewDie()
      )));
      setTries(prevTries => prevTries + 1);
    } else {
      setTenzies(false);
      setDiceState(generateRandomDices());
      setTries(0);  // Reset tries when starting a new game
    }
  }

  function holdDice(id) {
    if (tenzies) return;
    setDiceState(prevDiceState => {
      return prevDiceState.map(die => (
        die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die }
      ));
    });
  }

  const dices = diceState.map(die => (
    <Dice value={die.value} key={die.id} isHeld={die.isHeld} handleClick={() => holdDice(die.id)}></Dice>
  ));

  return (
    <main className="game-container">
      {tenzies && <Confetti />}
      <div className="top-bar">
        <h1 className="title">Tenzies</h1>
        <div className="tries-counter">
          Tries: <span className="tries-number">{tries}</span>
        </div>
        <div className="personal-best">
        Personal Best: <span className="personal-best-number">{personalBest === Infinity ? 'N/A' : personalBest}</span>
      </div>
      </div>

      <p className="description">Click "Roll Dice" to roll all dice. Hold dice by clicking on them, then roll again. Win by making all dice show the same number.</p>
      <br></br>
      <div className="dice-container">
        {dices}
      </div>
      <br></br>
      <button className="button-36" role="button" onClick={rollAgain}>{tenzies ? 'Reset Game' : 'Roll Dice'}</button>
      
      
    </main>
  );
}
