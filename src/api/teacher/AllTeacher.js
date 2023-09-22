import request from "@/util/request";

// 查询所有
export function selectAllTeacherInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/teachers",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 根据教师编号搜索
export function searchByTeachersId(id) {
  return request({
    method: "post",
    url: "/admin/searchByTeachersId",
    params: {
      teachersId: id,
    },
  });
}

// 根据教师名称搜索
export function searchByName(name) {
  return request({
    method: "post",
    url: "/admin/searchByName",
    params: {
      name: name,
    },
  });
}

// 删除
export function deleteTeachersById(id) {
  return request({
    method: "post",
    url: "/admin/deleteTeachersById",
    params: {
      id: id,
    },
  });
}

// 增加
export function insertTeachers(data) {
  return request({
    method: "post",
    url: "/admin/insertTeachers",
    data: data,
  });
}

// 修改
export function updateTeachers(data) {
  return request({
    method: "post",
    url: "/admin/updateTeachers",
    data: data,
  });
}
