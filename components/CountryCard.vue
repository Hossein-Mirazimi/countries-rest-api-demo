<template>
  <router-link :to="`/${country.name}`">
    <div class="country-card primary-background">
      <!-- <div class="flag" :style="{'background-image': `url(${country.flag})`}"></div> -->
      <!-- <img v-lazy="country.flag" alt="" class="flag"> -->
      <!-- <v-lazy-image
        :src="country.flag"
        :src-placeholder="country.flag"
        class="flag"
      /> -->
      <lazy-img :src="country.flag" :radiusT="6" class="flag"/>
      <div class="content">
        <div class="country-name font-bold">{{ country.name }}</div>
        <div class="mt-3">
          <span>Population: </span>
          <span class="font-light">{{
            country.population | numberFormat
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
  </router-link>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      require: true,
    },
  },
  
};
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
    /* &[lazy="loading"] {
      // lazy loading style
    } */
  }
  .content {
    padding: 22px 25px;
    .country-name {
      font-size: 17px;
    }
  }
}
</style>