import { RouterMount, createRouter } from "uni-simple-router";

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  h5: {
    vueRouterDev: true,
  },
  routes: [
    //...ROUTES,
    {
      path: "/",
      name: "Index",
      component: () => import("./views/home/index.vue"),
      redirect:"/console/chart"
    },
    {
      path: "/console",
      name: "console",
      component: () => import("./views/console/index.vue"),
      children: [
        {
          path: "chart",
          component: () => import("./views/chart/index.vue"),
          meta: {
            title: "我的可视化",
          },
        },
        {
          path: "data",
          component: () => import("./views/data/index.vue"),
          meta: {
            title: "数据源管理",
          },
        },
        {
          path: "dict",
          component: () => import("./views/dict/index.vue"),
          meta: {
            title: "字典管理",
          },
        },
        {
          path: "category",
          component: () => import("./views/category/index.vue"),
          meta: {
            title: "分类管理",
          },
        },
        {
          path: "market",
          component: () => import("./views/market/index.vue"),
          meta: {
            title: "案例市场",
          },
        },
      ],
    },
    {
      path: "/editor/:id",
      name: "editor",
      component: () => import("./views/editor/index.vue"),
    },
    {
      path: "/view/:id",
      name: "view",
      component: () => import("./views/view/index.vue"),
    },

    {
      path: "/demo",
      name: "demo",
      component: () => import("./views/demo/index.vue"),
    },
  ],
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {});

export { router, RouterMount };
