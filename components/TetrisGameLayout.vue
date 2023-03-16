<script lang="ts" setup>
import {TetrisGame} from "~/game/TetrisGame";
import {Board} from "~/game/Board";
import NextTetromino from "~/components/Tetris/NextTetromino.vue";

const game = ref<TetrisGame | null>(null);

onMounted(() => {
  const board = new Board(10, 20);
  game.value = new TetrisGame(board);
  game.value.start();

  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});



const handleKeyDown = (event: KeyboardEvent) => {
  if (!game.value || game.value.isPaused) return;

  switch (event.key) {
    case "ArrowUp":
      game.value.rotateTetromino();
      break;
    case "ArrowDown":
      game.value.moveTetromino({x: 0, y: 1});
      break;
    case "ArrowLeft":
      game.value.moveTetromino({x: -1, y: 0});
      break;
    case "ArrowRight":
      game.value.moveTetromino({x: 1, y: 0});
      break;
    case " ":
      // Ajouter la fonctionnalité de chute instantanée (hard drop)
      break;
  }
};

</script>

<template>
  <div class="TetrisGame" v-if="game">

    score : {{ game.board.score }}
    prochain : <NextTetromino :next-tetromino="game.nextTetromino" />


    <TetrisTimer :elapsed-time="game.elapsedTime" />

    <TetrisBoard :board="game.board" :current-tetromino="game.currentTetromino"/>



  </div>
</template>

<style lang="scss" scoped>
.TetrisGame {
  color: white;
  outline: none;
}
</style>