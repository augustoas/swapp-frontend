import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Cookies from "js-cookie";

const token = Cookies.get("auth_token");
const auth_email = Cookies.get("auth_email");

if (token) {
  store.dispatch("auth/authenticate", { token, auth_email });
}

Vue.config.productionTip = false;

Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
