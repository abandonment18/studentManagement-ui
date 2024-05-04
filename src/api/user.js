import request from "@/util/request";

// 查询所有
export function selectAllUserInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/user",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 删除
export function deleteUserById(id) {
  return request({
    method: "get",
    url: "/admin/deleteUserById",
    params: {
      id: id,
    },
  });
}

// 修改
export function updateUser(data) {
  return request({
    method: "post",
    url: "/admin/updateUser",
    data: data,
  });
}
