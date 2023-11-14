export default function GameBoard({ onSelectedSquare, gameBoard }) {
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