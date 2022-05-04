import Vue from "vue";
import VueRouter from "vue-router";
import TheHome from "../views/TheHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: TheHome,
  },
  {
    path: "/user/:id",
    name: "UserView",
    // route level code-splitting
    // this generates a separate chunk (userView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "userView" */ "../views/TheUser"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
