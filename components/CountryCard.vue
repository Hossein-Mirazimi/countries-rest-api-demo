<template functional>
  <nuxt-link :to="`/${props.country.name}`">
    <div class="country-card primary-background">
      <lazy-img :src="props.country.flag" :radiusT="6" class="flag"/>
      <div class="content">
        <div class="country-name font-bold">{{ props.country.name }}</div>
        <div class="mt-3">
          <span>Population: </span>
          <span class="font-light">{{
            props.country.population | numberFormat
          }}</span>
        </div>
        <div class="mt-2">
          <span>Region: </span>
          <span class="font-light">{{ props.country.region }}</span>
        </div>
        <div class="mt-2 mb-4">
          <span>Capital: </span>
          <span class="font-light">{{ props.country.capital }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

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