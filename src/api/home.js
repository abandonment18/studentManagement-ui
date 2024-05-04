import request from "@/util/request";

export function selectCourseChooseNumber() {
  return request({
    url: "/admin/selectCourseChooseNumber",
    method: "post",
  });
}

export function selectEmploymentRankings() {
  return request({
    url: "/admin/selectEmploymentRankings",
    method: "post",
  });
}

export function selectProgrammingLanguageRankings() {
  return request({
    url: "/admin/selectProgrammingLanguageRankings",
    method: "post",
  });
}

export function selectStudentCount() {
  return request({
    url: "/admin/selectStudentCount",
    method: "post",
  });
}

/**
 * 查询菜单
 * @param {String} token token
 * @returns
 */
export function selectMenu(token) {
  return request({
    url: "/admin/selectMenu",
    method: "post",
    data: {
      token: token,
    },
  });
}
