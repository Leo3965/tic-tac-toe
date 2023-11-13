import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'
import Log from './components/Log.jsx'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')
  const activePlayer = deriveActivePlayer(gameTurns)
  function handleSelectedSquare(row, col) {
    // setActivePlayer((current) => current === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      return [
        {
          square: { row, col },
          player: currentPlayer,
        },
        ...gameTurns,
      ]
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player isActive={activePlayer === 'X'} initialName='Player 1' symbol='X' />
          <Player isActive={activePlayer === 'O'} initialName='Player 2' symbol='O' />
        </ol>

        <GameBoard turns={gameTurns} onSelectedSquare={handleSelectedSquare} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App
