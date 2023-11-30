import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import BottomBar from "./BottomBar.vue";

Vue.use(Vuex);
Vue.use(VueRouter);

export default {
  title: "BottomBar",
  component: BottomBar,
  argTypes: {
    authenticated: { control: "boolean" },
  },
};

const getRoutes = (authenticated) => [
  { path: "/", name: "Home" },
  { path: "/post", name: "Post a Job" },
  { path: "/jobs", name: "Browse Jobs" },
  {
    path: authenticated ? "/profile" : "/signin",
    name: authenticated ? "Profile" : "Profile",
  },
  // Add other routes as needed
];

export const Default = (args) => {
  const store = new Vuex.Store({
    state: {
      authenticated: args.authenticated,
    },
  });

  const router = new VueRouter({
    routes: getRoutes(args.authenticated),
  });

  return {
    components: { BottomBar },
    store,
    router,
    template: "<BottomBar />",
  };
};

Default.args = {
  authenticated: false,
};
