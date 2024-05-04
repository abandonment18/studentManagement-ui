import { getToken, setToken, removeToken } from "@/util/auth";
import { login } from "@/api/login";
import { selectPerson } from "@/api/personalInfo";
import { logout } from "@/api/logout";

export default {
  namespaced: true,
  state: {
    token: "",
    userType: "",
    name: "",
    userId: "",
    teacherID: "",
    studentID: "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERTYPE: (state, userType) => {
      state.userType = userType;
    },
    SET_TEACHERID: (state, teacherID) => {
      state.teacherID = teacherID;
    },
    SET_STUDENTID: (state, studentID) => {
      state.studentID = studentID;
    },
  },

  actions: {
    login: function ({ commit }, value) {
      return new Promise((resolve, reject) => {
        login(value)
          .then((res) => {
            commit("SET_TOKEN", res.data.token);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    personInfo: function ({ commit }, value) {
      return new Promise((resolve, reject) => {
        selectPerson()
          .then((res) => {
            commit("SET_NAME", res.data.name);
            commit("SET_USERID", res.data.id);
            commit("SET_USERTYPE", res.data.userType);
            // console.log(res);
            if (res.data.userType == "0") {
              commit("SET_TEACHERID", res.data.teacherID);
            } else if (res.data.userType == "1") {
              commit("SET_STUDENTID", res.data.studentID);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout: function ({ commit }, value) {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            commit("SET_TOKEN", "");
            commit("SET_NAME", "");
            commit("SET_USERID", "");
            commit("SET_USERTYPE", "");
            commit("SET_TEACHERID", "");
            commit("SET_STUDENTID", "");
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
