<template>
  <div class="fill-height">
    <slot />
  </div>
</template>

<style scoped>
.fill-height {
  /* stylelint-disable */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
