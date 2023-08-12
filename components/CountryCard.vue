<template>
  <NuxtLink :to="`/${String(country.name).toLocaleLowerCase()}`">
    <div class="country-card primary-background">
      <MyImage :src="country.flags.svg" :key="country.flags.png" :radius-t="6" class="flag"/>
      <div class="content">
        <div class="country-name font-bold">{{ country.name }}</div>
        <div class="mt-3">
          <span>Population: </span>
          <span class="font-light">{{
            numberFormat(country.population)
          }}</span>
        </div>
        <div class="mt-2">
          <span>Region: </span>
          <span class="font-light">{{ country.region }}</span>
        </div>
        <div class="mt-2 mb-4">
          <span>Capital: </span>
          <span class="font-light">{{ country.capital }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
export default {
  props: {
    country: {
      type: Object,
      required: true
    }
  },
  methods: {
    numberFormat:(value: string | number) => Number(value).toLocaleString()
  }
}
</script>

<style scoped lang="scss">
.country-card {
  width: 100%;
  cursor: pointer;
  margin-bottom: 45px;
  @media (min-width: 576px) {
    height: 375px;
  }
  .flag {
    border-radius: 6px 6px 0 0;
  }
  .content {
    padding: 22px 25px;
    .country-name {
      font-size: 17px;
    }
  }
}
</style>
