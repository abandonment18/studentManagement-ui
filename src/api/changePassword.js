import request from "@/util/request";

// 修改
export function updatePassword(data) {
  return request({
    method: "post",
    url: "/admin/updatePassword",
    data: data,
  });
}
