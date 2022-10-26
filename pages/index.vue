<template>
  <div class="container pt-5">
    <div class="row justify-content-between">
      <div class="col-12 col-sm-6 col-md-5 col-lg-4">
        <search-input v-model="search" />
      </div>
      <div class="col d-flex justify-content-start justify-content-sm-end mt-5 mt-sm-0">
        <select-option v-model="region" :options="options" />
      </div>
    </div>
    <div v-if="$fetchState.pending" class="d-flex mt-5 justify-content-center">
      <LoadingCom />
    </div>
    <div v-else-if="$fetchState.error" class="text-center error mt-5">
      <div class="font-bold font-30">{{ $fetchState.error?.statusCode }}</div>
      <div class="msg">{{ $fetchState.error.message }}</div>
    </div>
    <div v-else class="row mt-4 mt-sm-5">
      <div
        v-for="(country, index) in filterCountries"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3 px-3"
      >
        <country-card :country="country" />
      </div>
    </div>
  </div>
</template>

<script>
import { findBestMatch, sortCallback } from "@/util/search";
import { fetchAllEndpoint, fetchCountriesByRegion } from '@/util/endpoint';

export default {
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
      fetchState: {
        pending: true,
        error: null,
      },
    };
  },
  async fetch() {
    const { query } = this.$route;
    const url = query.region
      ? fetchCountriesByRegion(query.region.toLowerCase())
      : fetchAllEndpoint;

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
  computed: {
    filterCountries() {
      // @ts-ignore
      let filterCountriesList = [];
      if (this.countries.length > 0) {
        // @ts-ignore
        const search = this.search.toLowerCase();
        if (search) {
          // find country by search
          // @ts-ignore
          const country = this.countries.find(
            // @ts-ignore
            (country) => country.name.toLowerCase() === search
          );

          if (country) {
            filterCountriesList = [country];
          } else {
            // find best match
            const findBest = findBestMatch(search, this.countries);
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
          // @ts-ignore
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          filterCountriesList = this.countries.sort((a, b) => sortCallback(a, b, "population"));
        }
      }

      // @ts-ignore
      return filterCountriesList;
    },
    region: {
      get() {
        const { query } = this.$route;
        return query.region || "";
      },
      set(region) {
        const { query } = this.$route;
        // @ts-ignore
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
        // @ts-ignore
        this.$router.push({ path: "/", query: { ...query, search } });
      },
    },
  },
  watch: {
    "$route.query": "$fetch",
  },
  watchQuery: ["region"],
}
</script>
