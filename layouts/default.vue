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
          <fa-icon class="icon" :icon="[$colorMode.value == 'dark' ? 'fa' : 'far', 'moon']" />
          <div class="ml-2">Dark Mode</div>
        </div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerPattern: require("@/assets/images/bg-pattern-header.svg"),
    };
  },
  methods: {
    switchTheme() {
      const currentTheme = this.$colorMode.value;
      let theme = currentTheme === 'dark' ? 'light' : 'dark';

      this.$colorMode.preference = theme;
    },
  },
};
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