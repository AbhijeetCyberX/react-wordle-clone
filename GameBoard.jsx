import Row from "./Row.jsx";

import {
  evaluateGuess
} from "../utils/evaluateGuess.js";


function GameBoard({
  pastGuesses,
  currentGuess,
  solution
}) {

  return (

    <section
      className="game-board"
      aria-label="Wordle game board"
    >

      {Array.from({ length: 6 }, (_, index) => {

        const submittedGuess = pastGuesses[index];

        const isCurrent = (
          index === pastGuesses.length
        );

        return (

          <Row

            key={index}

            guess={
              submittedGuess ||
              (isCurrent ? currentGuess : "")
            }

            result={
              submittedGuess
                ? evaluateGuess(submittedGuess, solution)
                : []
            }

            isCurrent={isCurrent}

          />

        );

      })}

    </section>

  );

}

export default GameBoard;