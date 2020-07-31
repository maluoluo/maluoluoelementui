import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./stylesheets/css/index.css";
import "font-awesome/scss/font-awesome.scss";

Vue.config.productionTip = false;
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     sessionStorage.removeItem("user");
//   }
//   var user = sessionStorage.getItem("user");
//   if (!user && to.path !== "/login") {
//     next({
//       path: "/login",
//     });
//   } else {
//     next();
//   }
// });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
