import { createStore } from "vuex";
import user from "./modules/user";
import menu from "./modules/menu";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    menu,
  },
});
