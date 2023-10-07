<script>
  import Field from "./Field.svelte";

  export let state;
</script>

<div class="board" style="--board-size: {state.boardSize}">
  {#each state.boardArray as row, rowIndex}
    {#each row as column, columnIndex}
      <Field {state} {rowIndex} {columnIndex} />
    {/each}
  {/each}
</div>

<style>
  .board {
    aspect-ratio: 1/1;
    width: 80%;
    border: 2px solid grey;
    display: grid;
    grid-template-columns: repeat(var(--board-size), 1fr);
    grid-template-rows: repeat(var(--board-size), 1fr);
  }
</style>
