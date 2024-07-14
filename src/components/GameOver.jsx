export default function GameOver({ winner, restart }) {
	return (
		<div id="game-over">
			<h2>Game Over!</h2>
			{winner && <p>Vince {winner}!</p>}
			{!winner && <p>Pareggio!</p>}
			<button onClick={restart}>Ricomincia!</button>
		</div>
	);
}
