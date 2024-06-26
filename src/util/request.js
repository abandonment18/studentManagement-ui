import axios from "axios";
import * as vant from "vant";
import { getToken } from "@/util/auth";
import errorCode from "./errorCode";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/store";
import router from "@/router";
// 是否显示重新登录
// export let isRelogin = { show: false };

/**
 * 是否展示弹窗 ElMessageBox
 */
let isRelogin = {
  show: false,
};

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// create an axios instance
const service = axios.create({
  baseURL: "dev-api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // do something before request is sent
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    // if (config.method === "get" && config.params) {
    //   let url = config.url + "?";
    //   for (const propName of Object.keys(config.params)) {
    //     const value = config.params[propName];
    //     var part = encodeURIComponent(propName) + "=";
    //     if (value !== null && typeof value !== "undefined") {
    //       if (typeof value === "object") {
    //         for (const key of Object.keys(value)) {
    //           if (value[key] !== null && typeof value[key] !== "undefined") {
    //             const params = propName + "[" + key + "]";
    //             const subPart = encodeURIComponent(params) + "=";
    //             url += subPart + encodeURIComponent(value[key]) + "&";
    //           }
    //         }
    //       } else {
    //         url += part + encodeURIComponent(value) + "&";
    //       }
    //     }
    //   }
    //   url = url.slice(0, -1);
    //   config.params = {};
    //   config.url = url;
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.resolve(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const code = response.data.code;
    const msg = response.data.msg;
    // console.log(response);
    // 接口成功发送后返回的错误判断
    // if (code === 401) {
    //   ElMessage({
    //     message: msg,
    //     type: "error",
    //   });
    //   return Promise.reject(new Error(msg));
    // } else
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm("请重新登录", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            isRelogin.show = false;
            store.dispatch("user/logout").then(() => {
              location.href = "/";
            });
            isRelogin.show = false;
          })
          .catch(() => {
            isRelogin.show = false;
          });
      }
      return Promise.resolve(
        new Error("无效的对话，或者对话已过期，请重新登录")
      );
    } else if (code == 500 || code == 403 || code == 401 || code == 404) {
      handleErrorResponse(code);
      return Promise.resolve(new Error(msg));
    } else if (code != 200) {
      ElMessage({
        type: "error",
        message: msg,
      });
      return Promise.resolve(new Error("error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log(error);
    // 对响应错误做些处理
    if (error && error.response) {
      // 请求已发出，但服务器返回的状态码不在 2xx 范围内
      const { status, data } = error.response;
      const message = data.message || "请求错误";

      if (status === 401) {
        // 处理未授权错误
        // 这里可以执行一些操作，比如跳转到登录页面
        ElMessage.error("未授权，请登录");
        // router.push('/login'); // 假设使用了Vue Router
      } else {
        // 其他错误状态码的处理
        ElMessage.error(`错误代码：${status}，错误信息：${message}`);
      }
    } else {
      // 请求超时或网络错误
      const message = error.message || "网络错误";
      ElMessage.error(message);
    }
    return Promise.resolve(error);
  }
);

// 处理异常
export function handleErrorResponse(status) {
  const errorMessage = errorCode[status] || errorCode.default;
  ElMessage.error(errorMessage);
}

export default service;
