import Tile from "./Tile.jsx";


function Row({
  guess = "",
  result = [],
  isCurrent = false
}) {

  return (

    <div className="board-row">

      {Array.from({ length: 5 }, (_, index) => (

        <Tile

          key={index}

          letter={guess[index] || ""}

          status={result[index] || ""}

          isCurrent={
            isCurrent && Boolean(guess[index])
          }

        />

      ))}

    </div>

  );

}

export default Row;