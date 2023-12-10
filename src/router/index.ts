import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store"; // Adjust the path to where your store is exported

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/LandingPage.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/components/Forms/NewJobForm/NewJobForm.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () => import("@/views/Jobs.vue"),
  },
  {
    path: "/newswaper",
    name: "newswaper",
    component: () => import("@/views/NewSwaper.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    alias: "/login",
    component: () => import("@/components/Forms/AuthForm/AuthForm.vue"),
    meta: { requiresGuest: true },
    props: { component: "SignIn" },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/components/Forms/AuthForm/AuthForm.vue"),
    meta: { requiresGuest: true },
    props: { component: "SignUp" },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/components/Chat/Chat.vue"),
  },
  {
    path: "*",
    component: () => import("./NotFoundComponent.vue"),
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
