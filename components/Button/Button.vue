<script lang="ts" setup>

</script>

<template>
  <button class="ArcadeButton" @click="$emit('click')">
    <span class="ArcadeButtonInner"><slot/></span>
  </button>
</template>

<style lang="scss" scoped>
.ArcadeButton {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #e91e63;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  box-shadow: 0 5px 0 #731E3B;
  transition: all 0.1s ease-in-out;

  &:active {
    transform: translateY(5px);
    box-shadow: none;
  }

  &Inner {
    position: relative;
    z-index: 1;
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    border-radius: 10px;
  }
}
</style>