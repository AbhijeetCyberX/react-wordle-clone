function Tile({
  letter = "",
  status = "",
  isCurrent = false
}) {

  const className = [

    "tile",

    letter ? "tile-filled" : "",

    isCurrent ? "tile-current" : "",

    status ? `tile-${status}` : ""

  ].filter(Boolean).join(" ");


  return (

    <div
      className={className}
      aria-label={`${letter || "empty"} ${status}`}
    >

      {letter}

    </div>

  );

}

export default Tile;