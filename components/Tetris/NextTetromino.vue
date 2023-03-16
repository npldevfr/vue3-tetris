<script lang="ts" setup>
import {ITetromino} from "~/game/Tetris";

const props = defineProps<{
  nextTetromino: ITetromino;
}>();

</script>

<template>
  <div class="next-tetromino">
    <div
        v-for="(row, rowIndex) in props.nextTetromino.shape"
        :key="'row-' + rowIndex"
        class="next-tetromino-row"
    >
      <div
          v-for="(cell, cellIndex) in row"
          :key="'cell-' + rowIndex + '-' + cellIndex"
          :class="['next-tetromino-cell', cell ? props.nextTetromino.getColor() : '']"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.next-tetromino {
  display: flex;
  flex-direction: column;
}

.next-tetromino-row {
  display: flex;
}

.next-tetromino-cell {
  width: 30px;
  height: 30px;
}

/* Ajoutez les styles pour chaque type de tétrimino */
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

</style>