import { useState } from 'react'

export default function Player({ initialName, symbol }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)

  const handleButton = () => {
    setIsEditing((editing) => !editing)
  }

  function handleChange(e) {
    setPlayerName(e.target.value)
  }

  let playerNameElement = <span className='player-name'>{playerName}</span>
  let button = <button onClick={handleButton}>Edit</button>

  if (isEditing) {
    playerNameElement = <input type='text' onChange={handleChange} value={playerName} required={true}/>
    button = <button onClick={handleButton}>Save</button>
  }

  return (
    <li>
            <span className='player'>
              {playerNameElement}
              <span className='player-symbol'>{symbol}</span>
            </span>
      {button}
    </li>
  )
}