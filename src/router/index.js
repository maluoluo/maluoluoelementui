import Vue from "vue";
import Router from "vue-router";
import login from "../views/login/index.vue";
// import Dashboard from "../views/dashboard";
import Article from "../views/article";
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/",
      redirect: "/login",
      // name: "login",
      component: () => import("../components/layout.vue"),
      children: [{
          path: "homepage",
          name: "首页",
          component: () => import("../views/homepage/index"),

        },
        {
          path: "form",
          name: "表单",
          component: () => import("../views/from/index"),
          children: [{
              path: "form1",
              name: "表单1",
              component: () => import("../views/from/form1"),

            },
            {
              path: "form2",
              name: "表单2",
              component: () => import("../views/from/form2"),

            },
          ]
        },

        {
          path: "article",
          name: "文章",
          component: Article,
        },
      ],
    },
  ],
});