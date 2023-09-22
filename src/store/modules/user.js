import { getToken, setToken, removeToken } from "@/util/auth";

const user = {
  state: {
    token: getToken(),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
};

export default user;
