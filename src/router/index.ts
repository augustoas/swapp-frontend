import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import NewJob from "@/views/NewJob.vue";
import Jobs from "@/views/Jobs.vue";
import AuthForm from "@/components/Forms/AuthForm.vue";
import Chat from "@/components/Chat/Chat.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "landingpage",
    component: LandingPage,
  },
  {
    path: "/post",
    name: "post",
    component: NewJob,
  },
  {
    path: "/jobs",
    name: "jobs",
    component: Jobs,
  },
  {
    path: "/signin",
    name: "signin",
    component: AuthForm,
    props: { component: "SignIn" },
  },
  {
    path: "/signup",
    name: "signup",
    component: AuthForm,
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

export default router;
