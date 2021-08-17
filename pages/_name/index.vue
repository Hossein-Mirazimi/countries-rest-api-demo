<template>
  <div class="container pb-5">
    <div class="mt-5">
      <!-- back link -->
      <nuxt-link to="/">
        <button class="primary-background back-route d-flex align-items-center">
          <fa-icon class="icon" :icon="['fa','long-arrow-alt-left']" />
          Back
        </button>
      </nuxt-link>
    </div>
    <div v-if="$fetchState.pending" class="d-flex mt-5 justify-content-center">
      <loading />
    </div>
    <div v-else-if="$fetchState.error" class="text-center error mt-5">
      <div class="font-bold font-30">{{ $fetchState.error.statusCode }}</div>
      <div class="msg">{{ $fetchState.error.message }}</div>
    </div>
    <div v-else class="row country justify-content-between">
      <div class="col-12 col-lg-6 pr-lg-5">
        <lazy-img :src="country.flag"/>
      </div>
      <div class="col-12 col-lg-6 pl-lg-5">
        <div class="detail">
          <h1 class="title" v-text="country.name" />
          <div class="row">
            <div class="col-12 col-md-12 col-lg-6">
              <div class="detail-item">
                <span class="font-600">Native Name: </span>
                <span class="font-light" v-text="country.nativeName" />
              </div>
              <div class="detail-item">
                <span class="font-600">Population: </span>
                <span class="font-light">{{
                  country.population | numberFormat
                }}</span>
              </div>
              <div class="detail-item">
                <span class="font-600">Region: </span>
                <span class="font-light" v-text="country.region" />
              </div>
              <div class="detail-item">
                <span class="font-600">Sub Region: </span>
                <span class="font-light" v-text="country.subregion" />
              </div>
              <div class="detail-item">
                <span class="font-600">Capital: </span>
                <span class="font-light" v-text="country.capital" />
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-6">
              <div class="detail-item">
                <span class="font-600">Top Level Domain: </span>
                <span class="font-light">
                  <span
                    v-for="(domain, index) in country.topLevelDomain"
                    :key="index"
                    >{{ `${index == 0 ? "" : ","} ${domain}` }}</span
                  >
                </span>
              </div>
              <div class="detail-item">
                <span class="font-600">Currencies: </span>
                <span class="font-light">
                  <span
                    v-for="(currency, index) in country.currencies"
                    :key="index"
                    >{{ `${index == 0 ? "" : ", "}${currency.name}` }}</span
                  >
                </span>
              </div>
              <div class="detail-item">
                <span class="font-600">Languages: </span>
                <span class="font-light">
                  <span
                    v-for="(lang, index) in country.languages"
                    :key="index"
                    >{{ `${index == 0 ? "" : ","} ${lang.name}` }}</span
                  >
                </span>
              </div>
            </div>
          </div>
          <div v-if="country.borders && country.borders.length > 0" class="mt-5 d-flex flex-column flex-lg-row flex-wrap align-items-lg-baseline">
            <span class="font-600 mr-2 mb-3 mb-xl-0">Border Countries: </span>
            <div>
              <button class="primary-background border-btn" v-for="(border, index) in country.borders" :key="index">{{ border }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const { params } = this.$route;
    const url = `https://restcountries.eu/rest/v2/name/${params.name.toLowerCase()}`;

    await this.$axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          this.country = response.data[0];
        }
      })
      .catch(() => {
        throw new Error("Error: Server has a problem");
      });
  },
  data() {
    return {
      country: null,
    };
  },
};
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