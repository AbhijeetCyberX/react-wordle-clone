import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import GameBoard from "./components/GameBoard.jsx";
import Keyboard from "./components/Keyboard.jsx";
import GameOverModal from "./components/GameOverModal.jsx";

import { WORDS } from "./data/words.js";

import {
  getKeyboardStatuses
} from "./utils/evaluateGuess.js";


function getRandomWord(previousWord = "") {

  const availableWords = WORDS.filter(
    word => word !== previousWord
  );

  return availableWords[
    Math.floor(Math.random() * availableWords.length)
  ];
}


function App() {

  // Centralized game states

  const [solutionWord, setSolutionWord] = useState(
    () => getRandomWord()
  );

  const [currentGuess, setCurrentGuess] = useState("");

  const [pastGuesses, setPastGuesses] = useState([]);

  const [gameStatus, setGameStatus] = useState(
    "IN_PROGRESS"
  );

  const [message, setMessage] = useState("");


  // Synchronize keyboard colors

  const keyboardStatuses = useMemo(() => {

    return getKeyboardStatuses(
      pastGuesses,
      solutionWord
    );

  }, [pastGuesses, solutionWord]);


  // Handle all keyboard actions

  const handleKey = useCallback((key) => {

    if (gameStatus !== "IN_PROGRESS") {
      return;
    }

    // ENTER BUTTON

    if (key === "ENTER") {

      if (currentGuess.length !== 5) {

        setMessage("Enter exactly five letters.");

        return;
      }

      if (!WORDS.includes(currentGuess)) {

        setMessage("Word not found in the word list.");

        return;
      }

      const updatedGuesses = [
        ...pastGuesses,
        currentGuess
      ];

      setPastGuesses(updatedGuesses);

      setCurrentGuess("");

      setMessage("");


      // Winning condition

      if (currentGuess === solutionWord) {

        setGameStatus("WON");

      }

      // Losing condition

      else if (updatedGuesses.length === 6) {

        setGameStatus("LOST");

      }

      return;
    }


    // BACKSPACE BUTTON

    if (key === "BACKSPACE") {

      setCurrentGuess(previous =>
        previous.slice(0, -1)
      );

      setMessage("");

      return;
    }


    // Alphabetical input

    if (
      /^[A-Z]$/.test(key) &&
      currentGuess.length < 5
    ) {

      setCurrentGuess(previous =>
        previous + key
      );

      setMessage("");
    }

  }, [
    currentGuess,
    pastGuesses,
    solutionWord,
    gameStatus
  ]);


  // Physical keyboard event listener

  useEffect(() => {

    function handlePhysicalKeyboard(event) {

      if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      ) {
        return;
      }

      if (event.key === "Enter") {

        event.preventDefault();

        handleKey("ENTER");

      }

      else if (event.key === "Backspace") {

        event.preventDefault();

        handleKey("BACKSPACE");

      }

      else if (/^[a-zA-Z]$/.test(event.key)) {

        handleKey(event.key.toUpperCase());

      }
    }

    window.addEventListener(
      "keydown",
      handlePhysicalKeyboard
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handlePhysicalKeyboard
      );

    };

  }, [handleKey]);


  // Restart game

  function restartGame() {

    setSolutionWord(previous =>
      getRandomWord(previous)
    );

    setCurrentGuess("");

    setPastGuesses([]);

    setGameStatus("IN_PROGRESS");

    setMessage("");
  }


  return (

    <main className="app-shell">

      <header className="game-header">

        <div></div>

        <h1>WORDLE</h1>

        <button
          className="header-restart"
          onClick={restartGame}
          aria-label="Restart game"
        >
          ↻
        </button>

      </header>


      <p className="instructions">
        Guess the hidden five-letter word in six attempts.
      </p>


      <div className="message" role="status">
        {message || " "}
      </div>


      {/* Game Board */}

      <GameBoard

        pastGuesses={pastGuesses}

        currentGuess={currentGuess}

        solution={solutionWord}

      />


      {/* Virtual Keyboard */}

      <Keyboard

        onKey={handleKey}

        statuses={keyboardStatuses}

        disabled={gameStatus !== "IN_PROGRESS"}

      />


      <footer>
        React + Vite | Wordle Clone
      </footer>


      {/* Game Over Modal */}

      <GameOverModal

        status={gameStatus}

        solution={solutionWord}

        onRestart={restartGame}

      />

    </main>

  );

}

export default App;