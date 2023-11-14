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

function deriveWinner(gameBoard, players) {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol]
    }
  }

  return winner
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])]
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }
  return gameBoard
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS)
  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((oldPlayers) => {
      return {
        ...oldPlayers,
        [symbol]: newName, // this overwrites a property
      }
    })
  }

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
          <Player isActive={activePlayer === 'X'} initialName={PLAYERS.X} symbol='X'
                  onChangeName={handlePlayerNameChange} />
          <Player isActive={activePlayer === 'O'} initialName={PLAYERS.O} symbol='O'
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
