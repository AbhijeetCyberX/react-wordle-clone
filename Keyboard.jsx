const KEY_ROWS = [

  "QWERTYUIOP",

  "ASDFGHJKL",

  "ZXCVBNM"

];


function Keyboard({
  onKey,
  statuses,
  disabled
}) {

  return (

    <div
      className="keyboard"
      aria-label="Virtual keyboard"
    >

      {KEY_ROWS.map((row, rowIndex) => (

        <div className="key-row" key={row}>

          {rowIndex === 2 && (

            <button

              className="key key-wide"

              onClick={() => onKey("ENTER")}

              disabled={disabled}

            >
              ENTER

            </button>

          )}


          {row.split("").map(letter => (

            <button

              key={letter}

              className={

                `key ${
                  statuses[letter]
                    ? `key-${statuses[letter]}`
                    : ""
                }`

              }

              onClick={() => onKey(letter)}

              disabled={disabled}

            >

              {letter}

            </button>

          ))}


          {rowIndex === 2 && (

            <button

              className="key key-wide"

              onClick={() => onKey("BACKSPACE")}

              disabled={disabled}

              aria-label="Backspace"

            >
              ⌫

            </button>

          )}

        </div>

      ))}

    </div>

  );

}

export default Keyboard;
