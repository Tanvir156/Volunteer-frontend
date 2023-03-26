import React from "react";
import Square from "./Square";
import { useState } from "react";

const GameBoard = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");
  const chooseSquare = (square) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "repeat(3, 0fr)",
        gridTemplateRows: "repeat(2, 1fr)",
      }}
    >
      <Square
        val={board[0]}
        chooseSquare={() => {
          chooseSquare(0);
        }}
      />
      <Square
        val={board[1]}
        chooseSquare={() => {
          chooseSquare(1);
        }}
      />
      <Square
        val={board[2]}
        chooseSquare={() => {
          chooseSquare(2);
        }}
      />
      <Square
        val={board[3]}
        chooseSquare={() => {
          chooseSquare(3);
        }}
      />
      <Square
        val={board[4]}
        chooseSquare={() => {
          chooseSquare(4);
        }}
      />
      <Square
        val={board[5]}
        chooseSquare={() => {
          chooseSquare(5);
        }}
      />
      <Square
        val={board[6]}
        chooseSquare={() => {
          chooseSquare(6);
        }}
      />
      <Square
        val={board[7]}
        chooseSquare={() => {
          chooseSquare(7);
        }}
      />

      <Square
        val={board[8]}
        chooseSquare={() => {
          chooseSquare(8);
        }}
      />
    </div>
  );
};

export default GameBoard;
