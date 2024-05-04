import { selectMenu } from "@/api/home";

export default {
  namespaced: true,
  state: {
    menuList: [],
  },

  mutations: {},

  actions: {
    getMenu: function ({ state }, value) {
      return new Promise((resolve, reject) => {
        selectMenu(value)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
