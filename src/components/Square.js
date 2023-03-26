import React from "react";
const Square = ({ chooseSquare, val }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
      }}
      onClick={chooseSquare}
    >
      {val}
    </div>
  );
};

export default Square;
