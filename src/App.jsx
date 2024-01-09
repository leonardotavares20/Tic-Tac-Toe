import Player from "./components/Player/Player";
import { useState } from "react";
import GamerBoard from "./components/GameBoard/GamerBoard";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const activePlayer = (gamerTurns) => {
  let currentPlayer = "X";

  if (gamerTurns.length > 0 && gamerTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const devireWinner = (gameBoard, playerNames) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareCombination =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareCombination &&
      firstSquareCombination === secondSquareCombination &&
      firstSquareCombination === thirdSquareCombination
    ) {
      winner = playerNames[firstSquareCombination];
    }
  }

  return winner;
};

const derivedGameBoard = (gamerTurns) => {
  const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gamerTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

function App() {
  const [playerNames, setPlayersNames] = useState(PLAYERS);
  const [gamerTurns, setGameTurns] = useState([]);

  const gameBoard = derivedGameBoard(gamerTurns);
  const currentPlayer = activePlayer(gamerTurns);
  const winner = devireWinner(gameBoard, playerNames);
  const hasDraw = gamerTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const current = activePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: current },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handlePLayerNameChange = (symbol, newName) => {
    setPlayersNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  };

  const restartGameHandle = () => {
    setGameTurns([]);
  };

  return (
    <>
      <main>
        <h1>Tic Tac Toe</h1>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              isActive={currentPlayer === "X"}
              namePlayer="Player 1"
              symbol={PLAYERS.X}
              onChangeName={handlePLayerNameChange}
            />
            <Player
              isActive={currentPlayer === "O"}
              namePlayer="Player 2"
              symbol={PLAYERS.O}
              onChangeName={handlePLayerNameChange}
            />
          </ol>
          <GamerBoard
            gameboard={gameBoard}
            turns={gamerTurns}
            onSelectSquare={handleSelectSquare}
          />
          {(winner || hasDraw) && (
            <GameOver onRestartGame={restartGameHandle} winner={winner} />
          )}
        </div>
        <Log turns={gamerTurns} />
      </main>
    </>
  );
}

export default App;
