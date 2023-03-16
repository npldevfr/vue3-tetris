<script lang="ts" setup>
import {Board} from "~/game/Board";
import {ITetromino} from "~/game/Tetris";

const props = defineProps<{
  board: Board;
  currentTetromino: ITetromino;
}>();

const boardGrid = computed((): number[][] => {
  return props.board.grid;
});

function isCurrentTetrominoCell(rowIndex: number, cellIndex: number): boolean {
  if (!props.currentTetromino) return false;
  const x = cellIndex - props.currentTetromino.position.x;
  const y = rowIndex - props.currentTetromino.position.y;
  // @ts-ignore
  return x >= 0 && x < props.currentTetromino.shape[0].length && y >= 0 && y < props.currentTetromino.shape.length && props.currentTetromino.shape[y][x];
}

function getCellClass(cell: number, rowIndex: number, cellIndex: number): string {
  if (cell) {
    return "board-cell-filled";
  }
  if (isCurrentTetrominoCell(rowIndex, cellIndex)) {
    return props.currentTetromino.getColor();
  }
  return "";
}

const clearedRowIndices = ref<number[]>([]);

watch(
    () => props.board,
    (newBoard, oldBoard) => {
      if (newBoard !== oldBoard) {
        newBoard.on("lineCleared", ({rowIndex}: { rowIndex: number }) => {
          clearedRowIndices.value.push(rowIndex);
          setTimeout(() => {
            clearedRowIndices.value = clearedRowIndices.value.filter(
                (index) => index !== rowIndex
            );
          }, 500);
        });
      }
    },
    {immediate: true}
);


</script>

<template>
  <div class="board">
    <div
        v-for="(row, rowIndex) in boardGrid"
        :key="'row-' + rowIndex"
        class="board-row"
        :class="{ pulse: clearedRowIndices.includes(rowIndex) }"
    >
      <div
          v-for="(cell, cellIndex) in row"
          :key="'cell-' + rowIndex + '-' + cellIndex"
          :class="['board-cell', getCellClass(cell, rowIndex, cellIndex)]"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
}

.board-row {
  display: flex;
}

.board-cell {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(204, 204, 204, 0.25);
}

.board-cell-filled {
  background-color: #333;
}

.tetromino-i {
  background-color: cyan;
}

.tetromino-j {
  background-color: blue;
}

.tetromino-l {
  background-color: orange;
}

.tetromino-o {
  background-color: yellow;
}

.tetromino-s {
  background-color: green;
}

.tetromino-t {
  background-color: purple;
}

.tetromino-z {
  background-color: red;
}

.pulse {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: limegreen;
  }
  100% {
    background-color: transparent;
  }
}
</style>