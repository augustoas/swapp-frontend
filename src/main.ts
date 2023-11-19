import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Cookies from "js-cookie";

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

const token = Cookies.get("auth_token");
const user = JSON.parse(localStorage.getItem("auth_user"));

if (token) {
  store.dispatch("auth/authenticate", { token, user });
}

// Dynamically load the Google Maps script
const googleMapsScript = document.createElement("script");
googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=en`;
googleMapsScript.async = true;
googleMapsScript.defer = true;
document.head.appendChild(googleMapsScript);

googleMapsScript.addEventListener("load", () => {
  // Initialize Vue app after Google Maps script is loaded
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
