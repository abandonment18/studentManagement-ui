import request from "@/util/request";

export function logout() {
  return request({
    method: "get",
    url: "/logout",
  });
}
