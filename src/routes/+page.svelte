<script>
  import Scoreboard from "./Scoreboard.svelte";
  import Board from "./Board.svelte";

  let boardSize = 10;
  let turn = 1; // Define 'turn' before using it
  $: boardArray = new Array(boardSize).fill([]).map(() => new Array(boardSize).fill(null));
  let currentPlayer = 1;
  $: state = { boardSize, boardArray, currentPlayer, turn };
</script>

<h1>Five in a Row - Gomoku</h1>
<span>{state.currentPlayer}</span>
<h2>Current Player {currentPlayer}</h2>
<div>
  <label for="board-size">Please enter board size!</label>
  <input id="board-size" type="range" bind:value={boardSize} min="10" max="20" />
  <span>Selected board size: {boardSize}</span>
</div>
<div class="">
  <Scoreboard />
  <Board {state} />
</div>

<style>
</style>
