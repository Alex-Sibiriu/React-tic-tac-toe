import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./data/winning-combinations";

const PLAYERS = {
	X: "Giocatore 1",
	O: "Giocatore 2",
};

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

// Funzione che assegna il turno al giocatore attivo
function deriveActivePlayer(turns) {
	let activePlayer = "X";

	if (turns.length > 0 && turns[0].player === "X") {
		activePlayer = "O";
	}

	return activePlayer;
}

// Funzione per aggiornare la board con i simboli
function updateBoard(turns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

	for (const turn of turns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
}

// Funzione che controlla se un giocatore ha vinto
function checkWinner(board, players) {
	let winner;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSymbol = board[combination[0].row][combination[0].column];
		const secondSymbol = board[combination[1].row][combination[1].column];
		const thirdSymbol = board[combination[2].row][combination[2].column];

		if (
			firstSymbol &&
			firstSymbol === secondSymbol &&
			firstSymbol === thirdSymbol
		) {
			winner = players[firstSymbol];
		}
	}

	return winner;
}

function App() {
	const [playersName, setPlayersName] = useState(PLAYERS);

	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);
	const gameBoard = updateBoard(gameTurns);
	const winner = checkWinner(gameBoard, playersName);
	const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	function handleRestart() {
		setGameTurns([]);
	}

	function handlePlayersName(symbol, newName) {
		setPlayersName((prevNames) => {
			return {
				...prevNames,
				[symbol]: newName,
			};
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						onChangeName={handlePlayersName}
						isActive={activePlayer === "X"}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						onChangeName={handlePlayersName}
						isActive={activePlayer === "O"}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} restart={handleRestart} />
				)}
				<GameBoard selectPlayer={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
