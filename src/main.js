import "core-js/stable";
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { iconsSet as icons } from "./assets/icons/icons.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import CountryFlag from "vue-country-flag";
import VueSocketIO from "vue-socket.io";
import VueRouter from "vue-router";
import Vuex from "vuex";
import i18n from '@/plugins/i18n';
import FlagIcon from 'vue-flag-icon';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css' // import the croppie css manually

import "./boot/window";
import store1 from './store/';
import {VUE_APP_URL} from './config/';

Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(CoreuiVue);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(FlagIcon);
Vue.component("country-flag", CountryFlag);
Vue.use(VueCroppie);

Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.prototype.$log = console.log.bind(console);
Vue.prototype._ = window._;

Vue.use(
  new VueSocketIO({
    debug: true,
    // connection: `${VUE_APP_URL}`,
    vuex: {
      // store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  el: "#app",  
  router,
  store: store1,
  icons,
  template: "<App/>",
  i18n,
  sockets: {
    connect: function () {
        console.log('* socket connected')
    },
  },
  components: {
    App,
  },
});
