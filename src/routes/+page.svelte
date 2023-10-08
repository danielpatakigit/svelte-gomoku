<script>
  let boardSize = 19;
  let turn = 1;
  let placementCounter = 1;
  let boardArray = new Array(boardSize).fill([]).map(() => new Array(boardSize).fill(null));
  let placementCounterArray = new Array(boardSize).fill([]).map(() => new Array(boardSize).fill(null));

  let player = 1;
  let gameOver = false;

  let showPlacementCounter = true;

  let checkWinnerArray = [];

  let p1Wins = 0;
  let p2Wins = 0;

  function handleClick(i, j) {
    const currentValue = boardArray[i][j];
    if (currentValue || gameOver) return;
    placementCounterArray[i][j] = placementCounter;
    placementCounter += 1;

    boardArray[i][j] = player;
    checkWinnerArray = checkWinner(i, j); // returns array either 0 or 5 long

    if (checkWinnerArray.length > 0) {
      player === 1 ? (p1Wins += 1) : (p2Wins += 1);
      gameOver = true;
      return;
    }

    if (player == 1) {
      player = 2;
    } else {
      player = 1;
      turn += 1;
    }
  }

  function checkWinner(row, col) {
    if (turn < 5) return [];

    const compString = JSON.stringify(Array(5).fill(player));

    // Check horizontally
    for (let i = 0; i <= boardSize - 5; i++) {
      const slice = boardArray[row].slice(i, i + 5);
      if (JSON.stringify(slice) === compString) {
        return [
          [row, i],
          [row, i + 1],
          [row, i + 2],
          [row, i + 3],
          [row, i + 4],
        ];
      }
    }

    // Check vertically
    for (let i = 0; i <= boardSize - 5; i++) {
      const slice = [];
      for (let j = 0; j < 5; j++) {
        slice.push(boardArray[i + j][col]);
      }
      if (JSON.stringify(slice) === compString) {
        return [
          [i, col],
          [i + 1, col],
          [i + 2, col],
          [i + 3, col],
          [i + 4, col],
        ];
      }
    }

    // Check diagonally (down-right)
    for (let i = 0; i <= boardSize - 5; i++) {
      for (let j = 0; j <= boardSize - 5; j++) {
        const slice = [];
        for (let k = 0; k < 5; k++) {
          slice.push(boardArray[i + k][j + k]);
        }
        if (JSON.stringify(slice) === compString) {
          return [
            [i, j],
            [i + 1, j + 1],
            [i + 2, j + 2],
            [i + 3, j + 3],
            [i + 4, j + 4],
          ];
        }
      }
    }

    // Check diagonally (down-left)
    for (let i = 0; i <= boardSize - 5; i++) {
      for (let j = 4; j < boardSize; j++) {
        const slice = [];
        for (let k = 0; k < 5; k++) {
          slice.push(boardArray[i + k][j - k]);
        }
        if (JSON.stringify(slice) === compString) {
          return [
            [i, j],
            [i + 1, j - 1],
            [i + 2, j - 2],
            [i + 3, j - 3],
            [i + 4, j - 4],
          ];
        }
      }
    }
    return []; // No winner yet
  }

  function restartGame() {
    turn = 1;
    boardArray = new Array(boardSize).fill([]).map(() => new Array(boardSize).fill(null));
    placementCounterArray = new Array(boardSize).fill([]).map(() => new Array(boardSize).fill(null));

    player === 1 ? (player = 2) : (player = 1);
    gameOver = false;
    placementCounter = 1;
    checkWinnerArray = []; // Reset checkWinnerArray
  }

  function isWinnerField(i, j) {
    const checkArray = [i, j];

    for (const field of checkWinnerArray) {
      if (JSON.stringify(field) === JSON.stringify(checkArray)) {
        return true;
      }
    }
  }
</script>

<div class="game">
  <h1>Five in a Row - Gomoku</h1>
  <hr />
  <h2>Player 1 (white) victories: {p1Wins}</h2>
  <h2>Player 2 (black) victories: {p2Wins}</h2>
  <div>
    <label for="showPlacementCounterCheckbox">Show stone counter</label>
    <input id="showPlacementCounterCheckbox" type="checkbox" bind:checked={showPlacementCounter} />
  </div>
  <hr />

  {#if gameOver}
    <h2 class="win-text">Player {player} wins</h2>
  {:else}
    <h3>Player {player}'s turn</h3>
  {/if}
  <button class="restart" on:click={restartGame}>Restart game</button>
  <div class="board" style="--board-size: {boardSize}; --stone-hover-clr: {player === 1 ? 'white' : 'black'}">
    {#each boardArray as row, i}
      {#each row as column, j}
        <button
          on:click={() => handleClick(i, j)}
          class="field {boardArray[i][j] !== null ? 'occupied' : 'hoverable'} {isWinnerField(i, j) ? 'winner' : ''}"
          class:game-over={gameOver}
          style="--stone-clr: {boardArray[i][j] === 1 ? 'white' : 'black'} ;
          --text-clr: {boardArray[i][j] === 1 ? 'black' : 'white'} "
        >
          <div class="stone">
            {#if showPlacementCounter}
              {placementCounterArray[i][j] ? placementCounterArray[i][j] : ""}
            {/if}
          </div>
        </button>
      {/each}
    {/each}
  </div>
</div>

<style>
  hr {
    border: 0.1px solid rgb(225, 225, 225);
    margin: 1rem 0;
    width: 100%;
  }

  .win-text {
    animation: pulsate 1s infinite;
  }
  .restart {
    padding: 0.2rem 0.5rem;
    border-radius: 7px;
    border: 1px solid rgb(225, 225, 225);
    cursor: pointer;
    margin: 1rem;
  }

  .restart:hover {
    filter: brightness(0.9);
    border: 1px solid rgb(183, 183, 183);
  }
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 100%; */
    margin: 2rem 2rem;
  }

  .board {
    margin: 1rem;
    width: 700px;
    height: 700px;
    border: 2px solid grey;
    display: grid;
    grid-template-columns: repeat(var(--board-size), 1fr);
    grid-template-rows: repeat(var(--board-size), 1fr);
    background-color: grey;

    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .field {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    border: 0.5px dashed rgb(201, 201, 201);
  }

  @keyframes pulsate {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

  .field.winner .stone {
    animation: pulsate 1s infinite;
  }
  .stone {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid grey;

    opacity: 0;
    transition: all 200ms ease-in-out;

    color: var(--text-clr);
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .field.occupied .stone {
    width: 90%;
    height: 90%;

    background-color: var(--stone-clr);
    opacity: 1;
  }

  .field:not(.game-over).hoverable:hover .stone {
    width: 60%;
    height: 60%;
    background-color: var(--stone-hover-clr);
    opacity: 1;
  }
</style>
