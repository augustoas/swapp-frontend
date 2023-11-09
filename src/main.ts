import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Cookies from "js-cookie";

const token = Cookies.get("auth_token");
const user = JSON.parse(localStorage.getItem("auth_user"));

if (token) {
  store.dispatch("auth/authenticate", { token, user });
}

Vue.config.productionTip = false;

Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
