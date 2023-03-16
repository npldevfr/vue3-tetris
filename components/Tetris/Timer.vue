<script lang="ts" setup>
const props = defineProps<{
  elapsedTime: number;
}>()

const minutes = computed((): number => {
  return Math.floor(props.elapsedTime / 60);
})

const seconds = computed((): number => {
  return props.elapsedTime % 60
})

</script>

<template>
  <div class="Timer">
    <div class="Timer__time">
      {{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Timer {
}
</style>