import request from "@/util/request";

export function login(data) {
  return request({
    method: "post",
    url: "/user/login",
    data: data,
    headers: {
      isToken: false,
    },
  });
}

// export function logout() {
//   return request({
//     method: "post",
//     url: "/logout",
//   });
// }
