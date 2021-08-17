<template>
  <div class="container pt-5">
    <div class="row justify-content-between">
      <div class="col-12 col-sm-6 col-md-5 col-lg-4">
        <search-input v-model="search" />
      </div>
      <div class="col d-flex justify-content-start justify-content-sm-end mt-5 mt-sm-0">
        <select-option :options="options" v-model="region" />
      </div>
    </div>
    <div v-if="$fetchState.pending" class="d-flex mt-5 justify-content-center">
      <loading />
    </div>
    <div v-else-if="$fetchState.error" class="text-center error mt-5">
      <div class="font-bold font-30">{{ $fetchState.error.statusCode }}</div>
      <div class="msg">{{ $fetchState.error.message }}</div>
    </div>
    <div v-else class="row mt-4 mt-sm-5">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 px-3"
        v-for="(country, index) in filterCountries"
        :key="index"
      >
        <country-card :country="country" />
      </div>
    </div>
  </div>
</template>

<script>
import { findBestMatch, sortCallback } from "@/util/search";
export default {
  watchQuery: ["region"],
  async fetch() {
    const { query } = this.$route;
    const url = query.region
      ? `https://restcountries.eu/rest/v2/region/${query.region.toLowerCase()}`
      : "https://restcountries.eu/rest/v2/all";

    await this.$axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          this.countries = response.data;
        }
      })
      .catch(() => {
        throw new Error("Error: Server has a problem");
      });
  },
  watch: {
    "$route.query": "$fetch",
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
      countries: [],
    };
  },
  computed: {
    filterCountries() {
      let filterCountriesList = [];
      if (this.countries.length > 0) {
        let search = this.search.toLowerCase();
        if (search) {
          // find country by search
          let country = this.countries.find(
            (country) => country.name.toLowerCase() == search
          );

          if (country) {
            filterCountriesList = [country];
          } else {
            // find best match
            let findBest = findBestMatch(search, this.countries);
            let sortedCountries = findBest.ratings.sort((a, b) =>
              sortCallback(a, b, "rating")
            );

            // filter bigger rating match string
            sortedCountries = sortedCountries.filter((e) => {
              if (e.rating > 0.3) {
                return e.rating > 0.3;
              } else {
                return e.rating > 0.2;
              }
            });

            filterCountriesList = sortedCountries.map((e) => e.target);

            // sort by population / country name
            filterCountriesList = filterCountriesList.sort((a, b) =>
              sortCallback(a, b, "population", "name")
            );
          }
        } else {
          // sort by population / country name
          filterCountriesList = this.countries.sort((a, b) =>
            sortCallback(a, b, "population")
          );
        }
      }

      return filterCountriesList;
    },
    region: {
      get() {
        const { query } = this.$route;
        return query.region || "";
      },
      set(region) {
        const { query } = this.$route;
        this.$router.push({ path: "/", query: { ...query, region } });
      },
    },
    search: {
      get() {
        const { query } = this.$route;
        return query.search || "";
      },
      set(search) {
        const { query } = this.$route;
        this.$router.push({ path: "/", query: { ...query, search } });
      },
    },
  },
};
</script>