import { createRouter, createWebHashHistory } from "vue-router";

const modules = import.meta.globEager("./modules/**/*.js");

const routeModuleList = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

const LoginRoute = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...LoginRoute, ...routeModuleList],
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    // ...
    // console.log(to, from, savedPosition);
  },
});
export default router;
