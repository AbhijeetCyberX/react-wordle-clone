// Evaluate the submitted guess

export function evaluateGuess(guess, solution) {

  const result = Array(5).fill("absent");

  const remaining = solution.split("");


  // Step 1: Check correct positions

  for (let i = 0; i < 5; i++) {

    if (guess[i] === solution[i]) {

      result[i] = "correct";

      remaining[i] = null;

    }

  }


  // Step 2: Check letters in different positions

  for (let i = 0; i < 5; i++) {

    if (result[i] === "correct") {

      continue;

    }

    const matchIndex = remaining.indexOf(
      guess[i]
    );

    if (matchIndex !== -1) {

      result[i] = "present";

      remaining[matchIndex] = null;

    }

  }

  return result;

}


// Synchronize virtual keyboard colors

export function getKeyboardStatuses(
  guesses,
  solution
) {

  const priority = {

    absent: 1,

    present: 2,

    correct: 3

  };

  const statuses = {};


  guesses.forEach(guess => {

    const results = evaluateGuess(
      guess,
      solution
    );

    guess.split("").forEach((letter, index) => {

      const nextStatus = results[index];

      if (

        !statuses[letter] ||

        priority[nextStatus] >
        priority[statuses[letter]]

      ) {

        statuses[letter] = nextStatus;

      }

    });

  });

  return statuses;

}