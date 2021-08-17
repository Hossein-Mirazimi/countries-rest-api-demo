<template>
  <div class="text-center">
    <div v-if="error.statusCode === 404">
      <h1 class="status-code">404</h1>
      <h1>Page not found</h1>
    </div>
    <h1 v-else>
      <h1 class="status-code">500</h1>
      <h1>An error occurred</h1>
    </h1>
    <nuxt-link to="/" class="link">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error-layout' // custom layout for the error page
  }
</script>

<style lang="scss" scoped>
.status-code {
  font-size: 6rem !important;
}
</style>