import request from "@/util/request";

// 查询所有
export function selectAllStudentCourseInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/studentCourse",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 根据教师编号搜索
export function searchStudentCourseByStudentId(id) {
  return request({
    method: "post",
    url: "/admin/searchStudentCourseByStudentId",
    params: {
      studentId: id,
    },
  });
}

// 根据课程名称搜索
export function searchStudentCourseByCourseName(name) {
  return request({
    method: "post",
    url: "/admin/searchStudentCourseByCourseName",
    params: {
      name: name,
    },
  });
}

// 根据教师名称搜索
export function searchStudentCourseByStudentName(name) {
  return request({
    method: "post",
    url: "/admin/searchStudentCourseByStudentName",
    params: {
      name: name,
    },
  });
}

// 删除
export function deleteStudentCourseById(id) {
  return request({
    method: "post",
    url: "/admin/deleteStudentCourseById",
    params: {
      id: id,
    },
  });
}

// 增加
export function insertStudentCourse(data) {
  return request({
    method: "post",
    url: "/admin/insertStudentCourse",
    data: data,
  });
}

// 修改
export function updateStudentCourse(data) {
  return request({
    method: "post",
    url: "/admin/updateStudentCourse",
    data: data,
  });
}

// 单个学生选课信息
export function selectStudentCourseInfoByStudentId(pageNum, pageSize, id) {
  return request({
    method: "get",
    url: "/admin/selectStudentCourseInfoByStudentId",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      id: id,
    },
  });
}
