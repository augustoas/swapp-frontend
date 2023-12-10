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
} from "./i18n";

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

loadLocaleMessages(userLocale)
  .then((messages) => {
    i18n.setLocaleMessage(userLocale, messages);
    updateLangAttribute(userLocale);
  })
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
