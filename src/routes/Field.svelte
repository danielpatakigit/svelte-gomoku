<script>
  export let state;
  export let rowIndex;
  export let columnIndex;

  function handleClick() {
    const currentValue = state.boardArray[rowIndex][columnIndex];
    if (currentValue) return;
    state.boardArray[rowIndex][columnIndex] = state.currentPlayer;

    if (state.currentPlayer == 1) {
      state.currentPlayer = 2;
    } else {
      state.currentPlayer = 1;
      state.turn += 1;
    }
  }
</script>

<button on:click={handleClick} class="field">{state.boardArray[rowIndex][columnIndex]}</button>

<style>
  .field {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    display: grid;
    place-items: center;
  }
</style>
