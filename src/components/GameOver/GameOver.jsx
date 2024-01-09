import React from "react";

const GameOver = ({ winner, onRestartGame }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} wins!</p>}
      {!winner && <p>Draw!</p>}
      <button onClick={onRestartGame}>Play Again</button>
    </div>
  );
};

export default GameOver;
