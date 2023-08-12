<template>
  <div class="container pb-5">
    <div class="mt-5">
      <nuxt-link to="/">
        <button class="primary-background back-route d-flex align-items-center">
          <!-- <fa-icon class="icon" :icon="['fa','long-arrow-alt-left']" /> -->
          Back
        </button>
      </nuxt-link>
    </div>
    <div v-if="pending" class="d-flex mt-5 justify-content-center">
      <LoadingCom />
    </div>
    <div v-else-if="error" class="text-center error mt-5">
      <div class="font-bold font-30">{{ error.statusCode }}</div>
      <div class="msg">{{ error.message }}</div>
    </div>
    <div v-else-if="country" class="row country justify-content-between">
      <div class="col-12 col-lg-6 pr-lg-5">
        <MyImage :src="country[0].flag"/>
      </div>
      <div class="col-12 col-lg-6 pl-lg-5">
        <div class="detail">
          <h1 class="title" v-text="country[0].name" />
          <div class="row">
            <div class="col-12 col-md-12 col-lg-6">
              <div class="detail-item">
                <span class="font-600">Native Name: </span>
                <span class="font-light" v-text="country[0].nativeName" />
              </div>
              <div class="detail-item">
                <span class="font-600">Population: </span>
                <span class="font-light">{{
                  numberFormat(country[0].population)
                }}</span>
              </div>
              <div class="detail-item">
                <span class="font-600">Region: </span>
                <span class="font-light" v-text="country[0].region" />
              </div>
              <div class="detail-item">
                <span class="font-600">Sub Region: </span>
                <span class="font-light" v-text="country[0].subregion" />
              </div>
              <div class="detail-item">
                <span class="font-600">Capital: </span>
                <span class="font-light" v-text="country[0].capital" />
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-6">
              <div class="detail-item">
                <span class="font-600">Top Level Domain: </span>
                <span class="font-light">
                  <span
                    v-for="(domain, index) in country[0].topLevelDomain"
                    :key="index"
                    >{{ `${index == 0 ? "" : ","} ${domain}` }}</span
                  >
                </span>
              </div>
              <div class="detail-item">
                <span class="font-600">Currencies: </span>
                <span class="font-light">
                  <span
                    v-for="(currency, index) in country[0].currencies"
                    :key="index"
                    >{{ `${index == 0 ? "" : ", "}${currency.name}` }}</span
                  >
                </span>
              </div>
              <div class="detail-item">
                <span class="font-600">Languages: </span>
                <span class="font-light">
                  <span
                    v-for="(lang, index) in country[0].languages"
                    :key="index"
                    >{{ `${index == 0 ? "" : ","} ${lang.name}` }}</span
                  >
                </span>
              </div>
            </div>
          </div>
          <div v-if="country[0].borders && country[0].borders.length > 0" class="mt-5 d-flex flex-column flex-lg-row flex-wrap align-items-lg-baseline">
            <span class="font-600 mr-2 mb-3 mb-xl-0">Border Countries: </span>
            <div>
              <button v-for="(border, index) in country[0].borders" :key="index" class="primary-background border-btn">{{ border }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchCountryByName } from '#imports';

const route = useRoute();

const url = fetchCountryByName(<string>route.params.name)
const { data: country, pending, error } = useFetch<[any]>(url, { method: 'get'})
useHead(computed(() => ({
  title: `Countries Rest API Demo | ${country.value?.[0].name}`,
})))
useSeoMeta(computed(() => ({
  title: country.value?.[0].name,
  description: `Countries Rest API Demo | ${country.value?.[0].name}`,
  ogTitle: country.value?.[0].name,
  ogDescription: `Countries Rest API Demo | ${country.value?.[0].name}`,
  ogImage: country.value?.[0].flag,
  ogUrl: route.path,
  twitterTitle: country.value?.[0].name,
  twitterDescription: `Countries Rest API Demo | ${country.value?.[0].name}`,
  twitterImage: country.value?.[0].flag,
  twitterCard: 'summary'
})));
const numberFormat = (value: string | number) => Number(value).toLocaleString()
</script>

<style lang="scss" scoped>
.icon {
  font-size: 18px;
  margin-right: 10px;
}
.country {
  margin-top: 45px;
  .flag {
    width: 100%;
    background-size: cover;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
    aspect-ratio: 4/3;
  }
  .title {
    margin-top: 30px;
    margin-bottom: 25px;
  }
  .detail-item {
    padding: 10px 0;
  }
  .border-btn {
    border: none;
    outline: none;
    font-size:12px;
    padding: 7px 24px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
