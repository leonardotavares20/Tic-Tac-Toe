import React from "react";

import { useState } from "react";

const Player = ({ namePlayer, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(namePlayer);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);

    if (isEditing) {
      onChangeName(symbol, name);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? (
          <input type="text" onChange={handleNameChange} value={name} />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
