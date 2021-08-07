<template>
  <div class="container pt-5">
    <img src="/loading.gif" width="30px" alt="" />
    <div class="filter-row">
      <search-input v-model="search" class="col-4" />
      <select-option :options="options" v-model="region" />
    </div>
    <!-- <div v-if="$fetchState.pending" class="d-flex mt-5 justify-content-center">
      <loading />
    </div>
    <div v-else-if="$fetchState.error">Error ...</div> -->
    <div class="row">
      <!-- <client-only> -->
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 px-3"
        v-for="(country, index) in filterCountries"
        :key="index"
      >
        <country-card :country="country" />
      </div>
      <!-- </client-only> -->
    </div>
  </div>
</template>

<script>
import { findBestMatch } from "@/util/search";

export default {
  async asyncData({ $axios, query }) {
    const region = query.region || null;
    const search = query.search || "";
    let countries = [];
    const url = !region
      ? "https://restcountries.eu/rest/v2/all"
      : `https://restcountries.eu/rest/v2/region/${region.toLowerCase()}`;

    console.log("query: ", query);
    console.log("url: ", url);
    // Request
    await $axios.get(url).then(({ status, data }) => {
      if (status === 200) {
        console.log("get datas");
        countries = data;
      }
    });

    return {
      region,
      search,
      countries,
    };
  },
  /* fetch() {
    const getAllUrl = "https://restcountries.eu/rest/v2/all";
    const getAllFilterRegionUrl = `https://restcountries.eu/rest/v2/region/${this.region.toLowerCase()}`;

    this.$axios
      .get(this.region ? getAllFilterRegionUrl : getAllUrl)
      .then((response) => {
        if (response.status === 200) {
          this.contries = response.data;
          console.log(this.contries.length);
          console.log(this.contries[0]);
        }
      });
  }, */
  computed: {
    pageQueries() {
      return this.$router.currentRoute.query;
    },
    filterCountries() {
      let filterCountries = [];
      console.log("countries", this.countries);
      if (this.countries.length > 0) {
        let search = this.search.toLowerCase();
        if (search) {
          const t0 = performance.now();
          let findBest = findBestMatch(search, this.countries);
          let sortedCountries = findBest.ratings.sort((a, b) => {
            if (a.rating > b.rating) {
              return -1;
            }
            if (a.rating < b.rating) {
              return 1;
            }
            return 0;
          });
          console.log({ sortedCountries });
          sortedCountries = sortedCountries.filter((e) => e.rating > 0.2);
          filterCountries = sortedCountries.map((e) => e.target);
          const t1 = performance.now();
          console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
        } else {
          filterCountries = this.countries;
        }
      }
      return filterCountries;
    },
  },
  watch: {
    "$route.query"(query) {
      this.region = query.region;
      this.search = query.search;
      // this.$fetch();
    },
    region(value) {
      this.$router.push({
        path: "/",
        query: { ...this.pageQueries, region: value },
      });
    },
    search(value) {
      console.log("search", value);
      this.$router.push({
        path: "/",
        query: { ...this.pageQueries, search: value },
      });
    },
  },
  data() {
    return {
      options: [
        {
          text: "Africa",
          value: "africa",
        },
        {
          text: "America",
          value: "americas",
        },
        {
          text: "Asia",
          value: "asia",
        },
        {
          text: "Europe",
          value: "europe",
        },
        {
          text: "Oceania",
          value: "oceania",
        },
      ],
      // region: "",
      // search: "",
      // contries: [],
    };
  },
  methods: {
    refresh() {
      console.log(this.$fetch());
    },
  },
  /*   beforeMount() {
    let query = this.$route.query;
    this.region = query.region || this.region;
    this.search = query.search || this.search;
  }, */
};
</script>

<style scoped lang="scss">
.filter-row {
  display: flex;
  justify-content: space-between;
}
</style>