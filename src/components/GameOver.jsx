export default function GameOver({ winner, onRestart }) {
  let paragraph = <p>It&apos;s a draw!</p>
  if (winner) {
    paragraph = <p>{winner} won!</p>
  }
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      <p>{paragraph}</p>
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  )
}