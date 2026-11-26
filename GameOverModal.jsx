function GameOverModal({
  status,
  solution,
  onRestart
}) {

  if (status === "IN_PROGRESS") {

    return null;

  }

  const won = status === "WON";


  return (

    <div className="modal-backdrop">

      <section
        className="modal"
        role="dialog"
        aria-modal="true"
      >

        <h2>

          {won
            ? "Congratulations!"
            : "Game Over!"
          }

        </h2>


        <p>

          {won
            ? "You guessed the correct word!"
            : "You used all six attempts."
          }

        </p>


        <p>

          The correct word was:

          <strong> {solution} </strong>

        </p>


        <button

          className="restart-button"

          onClick={onRestart}

        >

          Play Again

        </button>

      </section>

    </div>

  );

}

export default GameOverModal;