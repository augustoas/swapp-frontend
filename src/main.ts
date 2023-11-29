import Vue from "vue";

import HighchartsVue from "highcharts-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Cookies from "js-cookie";
import {
  i18n,
  loadLocaleMessages,
  userLocale,
  updateLangAttribute,
} from "./i18n"; // Import from i18n.ts

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

const token = Cookies.get("auth_token");
const user = JSON.parse(localStorage.getItem("auth_user"));
const jobInProgress = JSON.parse(localStorage.getItem("jobInProgress"));

if (token) {
  store.dispatch("auth/authenticate", { token, user });
}

if (jobInProgress) {
  store.dispatch("auth/jobInProgress", jobInProgress);
}

loadLocaleMessages(userLocale).then((messages) => {
  // Initialize VueI18n
  i18n.setLocaleMessage(userLocale, messages);
  updateLangAttribute(userLocale);

  // Dynamically load the Google Maps script
  const googleMapsScript = document.createElement("script");
  googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=${userLocale}`;
  googleMapsScript.async = true;
  googleMapsScript.defer = true;
  document.head.appendChild(googleMapsScript);

  googleMapsScript.addEventListener("load", () => {
    // Initialize Vue app after Google Maps script is loaded
    new Vue({
      router,
      store,
      vuetify,
      i18n, // Add i18n to Vue instance
      render: (h) => h(App),
    }).$mount("#app");
  });
});
