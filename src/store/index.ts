import Vue from "vue";
import Vuex from "vuex";

import global from "./global";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    auth,
  },
});
