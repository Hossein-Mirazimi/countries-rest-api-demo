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
        <div class="title font-bold">
          Where in the world?
        </div>
        <ClientOnly>
          <DarkToggle v-slot="{ toggle }">
            <div
              class="theme-switcher cursor-pointer align-items-center d-flex"
              @click="toggle"
            >
              <Icon v-if="$colorMode.value === 'dark'" class="icon" name="ri:sun-line" />
              <Icon v-else class="icon" name="ri:moon-line" />
              <div class="ml-2">
                Dark Mode
              </div>
            </div>
          </DarkToggle>
        </ClientOnly>
      </div>
    </header>
    <slot />
  </div>
</template>

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
