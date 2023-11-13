const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export default function GameBoard({ onSelectedSquare, turns }) {
  let gameBoard = initialGameBoard
  for (const turn of turns) {
    const { square, player } = turn
    const {row, col} = square

    gameBoard[row][col] = player
  }
  // const [gameBoard, setGameBoard] = useState(initialGameBoard)
  //
  // function handleBoardUpdate(row, col, symbol) {
  //   setGameBoard((prevBoard) => {
  //     const newBoard = [...prevBoard.map((innerArray) => [...innerArray])]
  //     newBoard[row][col] = symbol
  //     return newBoard
  //   })
  //
  //   onSelectedSquare()
  // }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) =>
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, colIndex) =>
              <li key={colIndex}>
                <button
                  onClick={() => onSelectedSquare(rowIndex, colIndex)}
                  disabled={symbol !== null}
                >
                  {symbol}</button>
              </li>,
            )}
          </ol>
        </li>,
      )}
    </ol>
  )
}