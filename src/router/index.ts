import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store"; // Adjust the path to where your store is exported
import NotFoundComponent from "./NotFoundComponent.vue";
import LandingPage from "@/views/LandingPage.vue";
import NewJobFrom from "@/components/Forms/NewJobForm/NewJobForm.vue";
import NewSwaper from "@/views/NewSwaper.vue";
import Jobs from "@/views/Jobs.vue";
import AuthForm from "@/components/Forms/AuthForm/AuthForm.vue";
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
    path: "/newswaper",
    name: "newswaper",
    component: NewSwaper,
  },
  {
    path: "/signin",
    name: "signin",
    alias: "/login",
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
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "*",
    component: NotFoundComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

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

  if (!isAuthenticated && requiresAuth) {
    next({ name: "signin", query: { redirect: to.fullPath } });
  }
}); // router.beforeResolve, and router.afterEach

export default router;
