<template>
  <div class="container pt-5">
    <img src="/loading.gif" width="30px" alt="">
    <div class="filter-row">
      <search-input v-model="search" class="col-4" />
      <select-option :options="options" v-model="region" />
    </div>
    <div v-if="$fetchState.pending" class="d-flex mt-5 justify-content-center">
      <loading/>
    </div>
    <div v-else-if="$fetchState.error">Error ...</div>
    <div v-else class="row">
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
export default {
 /* async asyncData({$axios, query}) {
   console.log('query: ', query)
 }, */
  async fetch() {
    const getAllUrl = "https://restcountries.eu/rest/v2/all";
    const getAllFilterRegionUrl = `https://restcountries.eu/rest/v2/region/${this.region}`;

    await this.$axios
      .get(this.region ? getAllFilterRegionUrl : getAllUrl)
      .then((response) => {
        if (response.status === 200) {
          this.contries = response.data;
          console.log(this.contries.length);
          console.log(this.contries[0]);
        }
      });
  },
  computed: {
    pageQueries() {
      return this.$router.currentRoute.query;
    },
    filterCountries() {
      let filterCountries = [];
      if (this.contries.length > 0) {
        let search = this.search.toLowerCase();
        if (search) {
          const t0 = performance.now();
          let findBest = this.findBestMatch(search, this.contries);
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
          filterCountries = this.contries;
        }
      }
      return filterCountries;
    },
  },
  watch: {
    "$route.query"(query) {
      this.region = query.region;
      this.search = query.search;
      this.$fetch();
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
      region: "",
      search: "",
      contries: [],
    };
  },
  methods: {
    checkIfStringsContainSameCharacters(string1, string2) {
      return new Set(string1).size === new Set(string1 + string2).size;
    },
    compareTwoStrings(first, second) {
      first = first.replace(/\s+/g, "");
      second = second.replace(/\s+/g, "");

      if (first === second) return 1; // identical or empty
      if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

      let firstBigrams = new Map();
      for (let i = 0; i < first.length - 1; i++) {
        const bigram = first.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
          ? firstBigrams.get(bigram) + 1
          : 1;

        firstBigrams.set(bigram, count);
      }

      let intersectionSize = 0;
      for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

        if (count > 0) {
          firstBigrams.set(bigram, count - 1);
          intersectionSize++;
        }
      }

      return (2.0 * intersectionSize) / (first.length + second.length - 2);
    },
    findBestMatch(mainString, targetStrings) {
      /* if (!areArgsValid(mainString, targetStrings))
        throw new Error(
          "Bad arguments: First argument should be a string, second should be an array of strings"
        ); */

      const ratings = [];
      let bestMatchIndex = 0;

      for (let i = 0; i < targetStrings.length; i++) {
        const currentTargetString = targetStrings[i];
        const currentRating = this.compareTwoStrings(
          mainString,
          currentTargetString.name
        );
        ratings.push({ target: currentTargetString, rating: currentRating });
        if (currentRating > ratings[bestMatchIndex].rating) {
          bestMatchIndex = i;
        }
      }

      const bestMatch = ratings[bestMatchIndex];

      return {
        ratings: ratings,
        bestMatch: bestMatch,
        bestMatchIndex: bestMatchIndex,
      };
    },
    refresh() {
      console.log(this.$fetch());
    },
  },
  beforeMount() {
    let query = this.$route.query;
    this.region = query.region || this.region;
    this.search = query.search || this.search;
  },
  mounted() {
    this.$nextTick(() => this.$fetch());
  },
};
</script>

<style scoped lang="scss">
.filter-row {
  display: flex;
  justify-content: space-between;
}
</style>