<template>
  <div id="app">
    <header class="primary-background">
      <div
        class="
          container
          header-container
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <div class="title font-bold">Where in the world?</div>
        <div
          class="theme-switcher cursor-pointer align-items-center d-flex"
          @click="switchTheme"
        >
          <!-- <fa-icon class="icon" :icon="[$colorMode.value == 'dark' ? 'fa' : 'far', 'moon']" /> -->
          <div class="ml-2">Dark Mode</div>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
function switchTheme() {
  const currentTheme = colorMode.value;
  const theme = currentTheme === 'dark' ? 'light' : 'dark';

  colorMode.preference = theme;
}
</script>

<style scoped lang="scss">
@import "@/assets/variable.scss";

#app {
  .header-container {
    height: 60px;
    .title {
      font-size: 20px;
    }
  }
  .icon {
    transform: rotate(-15deg);
  }
}
</style>
