<template>
  <div class="container pt-5">
    <div class="row justify-content-between">
      <div class="col-12 col-sm-6 col-md-5 col-lg-4">
        <SearchInput v-model="search" />
      </div>
      <div class="col d-flex justify-content-start justify-content-sm-end mt-5 mt-sm-0">
        <SelectOption v-model="region" :options="options" />
      </div>
    </div>
    <div v-if="pending" class="d-flex mt-5 justify-content-center">
      <LoadingCom />
    </div>
    <div v-else-if="error" class="text-center error mt-5">
      <div class="font-bold font-30">{{ error?.statusCode }}</div>
      <div class="msg">{{ error.message }}</div>
    </div>
    <InfinitiveScrollWrapper :chunk-count="30" :threshold="1000" :on-end="() => isFinished = !isDefined" :items="filterCountries" v-else class="row mt-4 mt-sm-5">
      <template #default="{item: country, index}">
        <div
          :key="index"
          class="col-12 col-sm-6 col-md-4 col-lg-3 px-3"
          >
            <CountryCard :country="country" />
      </div>
    </template>
    </InfinitiveScrollWrapper>
    <ClientOnly>
      <div v-if="!isFinished" class="d-flex mb-5 justify-content-center">
        <LoadingCom />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { findBestMatch, sortCallback, fetchAllEndpoint, fetchCountriesByRegion } from "#imports";
const isFinished = ref(false);
const options= [
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
      ];
      const router = useRouter();
      const route = useRoute();


    const url = route.query.region
      ? fetchCountriesByRegion(String(route.query.region).toLowerCase())
      : fetchAllEndpoint;

  const { pending, error, data: countries } = useFetch<Array<any>>(url);

  const search = computed({
    get() {
        return route.query.search || "";
      },
      set(search) {
        // @ts-ignore
        router.push({ path: "/", query: { ...route.query, search } });
      },
  })

  const region = computed({
    get() {
        const { query } = route;
        return query.region || "";
      },
      set(region) {
        const { query } = route;
        // @ts-ignore
        router.push({ path: "/", query: { ...query, region } });
      },
  })

  const filterCountries = computed(() => {

    // @ts-ignore
    let filterCountriesList = [];
    if (countries.value?.length > 0) {
        // @ts-ignore
        const _search = search.value.toLowerCase();
        if (_search) {
          // find country by search
          // @ts-ignore
          const country = countries.value?.find(
            // @ts-ignore
            (country) => country.name.toLowerCase() === _search
          );

          if (country) {
            filterCountriesList = [country];
          } else {
            // find best match
            const findBest = findBestMatch(_search, unref(countries.value));
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
          filterCountriesList = countries.value.sort((a, b) => sortCallback(a, b, "population"));
        }
      }

      // @ts-ignore
      return filterCountriesList;
  })

</script>
