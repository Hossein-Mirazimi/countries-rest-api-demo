import Vue from 'vue';

Vue.filter('numberFormat', (value) => Number(value).toLocaleString());