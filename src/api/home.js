import request from "@/util/request";

export function selectCourseChooseNumber() {
  return request({
    url: "/admin/selectCourseChooseNumber",
    method: "post",
  });
}
