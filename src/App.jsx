import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './assets/winning-combinations.js'
import GameOver from './components/GameOver.jsx'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState([{
    X: 'Player 1',
    O: 'Player 2',
  }])
  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(row => [...row])]
  let winner = null
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol]
    }
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((oldPlayers) => {
      return {
        ...oldPlayers,
        [symbol]: newName, // this overwrites a property
      }
    })
  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectedSquare(row, col) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      return [
        {
          square: { row, col },
          player: currentPlayer,
        },
        ...prevTurns,
      ]
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player isActive={activePlayer === 'X'} initialName='Player 1' symbol='X'
                  onChangeName={handlePlayerNameChange} />
          <Player isActive={activePlayer === 'O'} initialName='Player 2' symbol='O'
                  onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}

        <GameBoard gameBoard={gameBoard} onSelectedSquare={handleSelectedSquare} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App
