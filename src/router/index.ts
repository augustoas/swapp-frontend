import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store"; // Adjust the path to where your store is exported
import LandingPage from "@/views/LandingPage.vue";
import NewJobFrom from "@/components/Forms/NewJobForm.vue";
import NewSwapper from "@/views/NewSwapper.vue";
import Jobs from "@/views/Jobs.vue";
import AuthForm from "@/components/Forms/AuthForm.vue";
import Chat from "@/components/Chat/Chat.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
  },
  {
    path: "/post",
    name: "post",
    component: NewJobFrom,
  },
  {
    path: "/jobs",
    name: "jobs",
    component: Jobs,
  },
  {
    path: "/newswapper",
    name: "newswapper",
    component: NewSwapper,
  },
  {
    path: "/signin",
    name: "signin",
    component: AuthForm,
    meta: { requiresGuest: true },
    props: { component: "SignIn" },
  },
  {
    path: "/signup",
    name: "signup",
    component: AuthForm,
    meta: { requiresGuest: true },
    props: { component: "SignUp" },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (isAuthenticated && requiresGuest) {
    next({ name: "home" });
  } else if (
    !isAuthenticated &&
    to.matched.some((record) => record.meta.requiresAuth)
  ) {
    next({ name: "signin", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
