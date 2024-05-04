import request from "@/util/request";

// 查询所有
export function registerStudents(data) {
  return request({
    method: "post",
    url: "/admin/registerStudents",
    data: data,
  });
}

// 根据学生编号搜索
export function registerTeachers(data) {
  return request({
    method: "post",
    url: "/admin/registerTeachers",
    data,
  });
}
