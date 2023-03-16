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
const clearedRowIndices = ref<number[]>([]);
const mergedTetromino = ref<{ row: number, col: number, color: string }[]>([]);


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

function getMergeCellClass(rowIndex: number, colIndex: number) {
  const cell = mergedTetromino.value.find((cell) => cell.row === rowIndex && cell.col === colIndex);
  if (cell) return cell.color;
}


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

        newBoard.on("tetrominoMerged", ({tetromino}: { tetromino: ITetromino }) => {
          mergedTetromino.value = [];

          const mergedCells = [];
          for (let row = 0; row < tetromino.shape.length; row++) {
            for (let col = 0; col < tetromino.shape[row].length; col++) {
              if (tetromino.shape[row][col]) {
                mergedCells.push({
                  row: tetromino.position.y + row,
                  col: tetromino.position.x + col,
                  color: tetromino.getColor() + "-applied",
                });
              }
            }
          }

          mergedTetromino.value = mergedCells;
          setTimeout(() => {
            mergedTetromino.value = [];
          }, 100);
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
          :class="['board-cell', getCellClass(cell, rowIndex, cellIndex), getMergeCellClass(rowIndex, cellIndex)]"
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
  border-bottom: 4px solid rgba(199, 213, 216, 0.49);
  border-right: 1px solid rgba(51, 51, 51, 0.44);
  border-left: 1px solid rgba(51, 51, 51, 0.44);
}

.board-row {
  display: flex;
}

.board-cell {
  width: 30px;
  transition: transform 0.2s;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid rgba(51, 51, 51, 0.20);
}


.board-cell-filled {
  background-color: #333;
}

.tetromino-i {
  background: #85144b;

  &-applied {
    transform: scale(1.15);
    background: #85144b;
    border: none;
  }
}

.tetromino-j {
  background: #0074d9;

  &-applied {
    transform: scale(1.15);
    background: #0074d9;
    border: none;
  }
}


.tetromino-l {
  background: #ff851b;

  &-applied {
    transform: scale(1.15);
    background: #ff851b;
    border: none;

  }
}

.tetromino-o {
  background: #ff4136;

  &-applied {
    transform: scale(1.15);
    background: #ff4136;
    border: none;

  }
}

.tetromino-s {
  background: #f012be;

  &-applied {
    transform: scale(1.15);
    background: #f012be;
    border: none;

  }
}

.tetromino-t {
  background: #ffdc00;

  &-applied {
    transform: scale(1.15);
    background: #ffdc00;
    border: none;

  }
}

.tetromino-z {
  background: #2ecc40;

  &-applied {
    transform: scale(1.15);
    background: #2ecc40;
    border: none;

  }
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


.board-cell-dust {
  position: relative;
}

.board-cell-dust::before,
.board-cell-dust::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: #f0e68c;
  opacity: 0;
  animation: dust 0.4s ease-out forwards;
}

.board-cell-dust::after {
  animation-delay: 0.2s;
}

@keyframes dust {
  0% {
    height: 4px;
    opacity: 1;
  }
  100% {
    height: 0;
    opacity: 0;
  }
}
</style>