import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import TopBar from "./TopBar.vue";

Vue.use(Vuex);
Vue.use(VueRouter);

// Define the i18n structure
interface I18nMock {
  messages: {
    [key: string]: any;
  };
  locale: string;
}

// Mock i18n setup
const i18n: I18nMock = {
  messages: {
    en: {
      topBar: {
        postTask: "Post Task",
        browseTasks: "Browse Tasks",
        howItWorks: "How It Works",
        myProfile: "My Profile",
        logOut: "Log Out",
        signUp: "Sign Up",
        logIn: "Log In",
        becomeASwaper: "Become a Swaper",
      },
    },
  },
  locale: "en",
};

// Mock store
const store = new Vuex.Store({
  state: {
    authenticated: true,
  },
  getters: {
    topBarMessages: () => i18n.messages[i18n.locale].topBar,
  },
});

// Mock router
const router = new VueRouter({
  routes: [], // Define your routes here if necessary
});

export default {
  title: "TopBar",
  component: TopBar,
};

// Story definition
export const Default = () => ({
  components: { TopBar },
  store,
  router,
  template: "<TopBar />",
  beforeCreate() {
    // Type assertion for $i18n
    (this as any).$i18n = i18n;
  },
});
