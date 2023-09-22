import request from "@/util/request";

// 查询所有
export function selectPerson() {
  return request({
    method: "post",
    url: "/admin/selectPersonInfo",
  });
}

// 修改
export function updatePersonInfo(data) {
  return request({
    method: "post",
    url: "/admin/updatePersonInfo",
    data: data,
  });
}
