import { useState } from 'react'

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false)
  const handleButton = () => {
    setIsEditing(!isEditing)
  }

  const savePlayerName = (e) => {
    name = e.target.innerText
    setIsEditing(false)
  }

  let playerName = <span className='player-name'>{name}</span>
  let button = <button onClick={handleButton}>Edit</button>
  if (isEditing) {
    playerName = <input type='text' value={name} required />
    button = <button onClick={handleButton}>Save</button>
  }

  return (
    <li>
            <span className='player'>
              {playerName}
              <span className='player-symbol'>{symbol}</span>
            </span>
      {button}
    </li>
  )
}