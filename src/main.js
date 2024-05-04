import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/index.css";
import "@/assets/css/commen.css";
// 全局引用 element-icon
import * as Elicons from "@element-plus/icons-vue";
import { getToken, removeToken } from "./util/auth";

const app = createApp(App);

// 将ElMessage挂载到Vue实例的全局属性中
app.config.globalProperties.$message = ElementPlus.ElMessage;

// 注册 icon 全局组件
Object.keys(Elicons).forEach((key) => {
  app.component(key, Elicons[key]);
});

router.beforeEach((to, from, next) => {
  // console.log(getToken());
  if (getToken()) {
    // console.log(to.path);
    if (to.path === "/login") {
      removeToken();
      next();
    } else {
      next();
    }
  } else {
    if (to.path === "/login" || to.path === null) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});
app.use(ElementPlus).use(store).use(router).mount("#app");
