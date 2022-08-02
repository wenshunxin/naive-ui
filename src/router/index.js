import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    // ...
    console.log(to, from, savedPosition);
  },
});
console.log(router);
export default router;
