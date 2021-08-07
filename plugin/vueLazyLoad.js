import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);
 
// Vue.use(VueLazyload)
 
// or with options
Vue.use(VueLazyload, {
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'touchmove'],
  preLoad: 1.3,
  // error: '/error.png',
  loading: '/loading-2.gif',
  attempt: 1
});