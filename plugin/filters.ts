import Vue from 'vue';

Vue.filter('numberFormat', (value: string | number) => Number(value).toLocaleString());
