import request from "@/util/request";

// 查询所有
export function selectAllStudentInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/students",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 根据学生编号搜索
export function searchByStudentsId(id) {
  return request({
    method: "get",
    url: "/admin/searchByStudentsId",
    params: {
      studentsId: id,
    },
  });
}

// 根据学生名称搜索
export function searchStudentsByName(name) {
  return request({
    method: "get",
    url: "/admin/searchStudentsByName",
    params: {
      name: name,
    },
  });
}

// 删除
export function deleteStudentsById(id) {
  return request({
    method: "get",
    url: "/admin/deleteStudentsById",
    params: {
      id: id,
    },
  });
}

// 增加
export function insertStudents(data) {
  return request({
    method: "post",
    url: "/admin/insertStudents",
    data: data,
  });
}

// 修改
export function updateStudents(data) {
  return request({
    method: "post",
    url: "/admin/updateStudents",
    data: data,
  });
}
