import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)

  const handleButton = () => {
    setIsEditing((editing) => !editing)
    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value)
  }

  let playerNameElement = <span className='player-name'>{playerName}</span>
  let button = <button onClick={handleButton}>Edit</button>

  if (isEditing) {
    playerNameElement = <input type='text' onChange={handleChange} value={playerName} required={true} />
    button = <button onClick={handleButton}>Save</button>
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {playerNameElement}
        <span className='player-symbol'>{symbol}</span>
      </span>
      {button}
    </li>
  )
}