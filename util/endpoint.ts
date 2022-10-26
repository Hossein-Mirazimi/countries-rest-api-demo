
export const fetchAllEndpoint = 'https://restcountries.com/v2/all';

export const fetchCountryByName = (name = '') => `https://restcountries.com/v2/name/${name.toLowerCase()}`

export const fetchCountriesByRegion = (region = '') => `https://restcountries.com/v2/region/${region.toLowerCase()}`
