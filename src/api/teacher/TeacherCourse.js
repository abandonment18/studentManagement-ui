import request from "@/util/request";

// 查询所有
export function selectAllTeacherCourseInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/teacherCourse",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 根据教师编号搜索
export function searchTeacherCourseByTeachersId(id) {
  return request({
    method: "get",
    url: "/admin/searchTeacherCourseByTeachersId",
    params: {
      teachersId: id,
    },
  });
}

// 根据课程名称搜索
export function searchTeacherCourseByCourseName(name) {
  return request({
    method: "get",
    url: "/admin/searchTeacherCourseByCourseName",
    params: {
      name: name,
    },
  });
}

// 根据教师名称搜索
export function searchTeacherCourseByTeacherName(name) {
  return request({
    method: "get",
    url: "/admin/searchTeacherCourseByTeacherName",
    params: {
      name: name,
    },
  });
}

// 删除
export function deleteTeacherCourseById(id) {
  return request({
    method: "get",
    url: "/admin/deleteTeacherCourseById",
    params: {
      id: id,
    },
  });
}

// 增加
export function insertTeacherCourse(data) {
  return request({
    method: "post",
    url: "/admin/insertTeacherCourse",
    data: data,
  });
}

// 修改
export function updateTeacherCourse(data) {
  return request({
    method: "post",
    url: "/admin/updateTeacherCourse",
    data: data,
  });
}
