import request from "@/util/request";

// 分页查询查询所有
export function selectAllCoursesInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/courses",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 查询所有课程
export function selectAllCoursesInfoList() {
  return request({
    method: "get",
    url: "/admin/selectAllCoursesInfoList",
  });
}

// 根据课程编号搜索
export function searchByCoursesId(id) {
  return request({
    method: "get",
    url: "/admin/searchByCoursesId",
    params: {
      CoursesId: id,
    },
  });
}

// 删除
export function deleteCoursesById(id) {
  return request({
    method: "get",
    url: "/admin/deleteCoursesById",
    params: {
      id: id,
    },
  });
}

// 增加
export function insertCourses(data) {
  return request({
    method: "post",
    url: "/admin/insertCourses",
    data: data,
  });
}

// 修改
export function updateCourses(data) {
  return request({
    method: "post",
    url: "/admin/updateCourses",
    data: data,
  });
}
