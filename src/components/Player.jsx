import { useState } from "react";

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	function handleClick() {
		setIsEditing((editing) => !editing);

		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	let name = <span className="player-name">{playerName}</span>;

	if (isEditing) {
		name = (
			<input type="text" value={playerName} onChange={handleChange} required />
		);
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{name}
				<span className="player-symbol">{symbol}</span>
			</span>

			<button onClick={handleClick}>{isEditing ? "Salva" : "Modifica"}</button>
		</li>
	);
}
