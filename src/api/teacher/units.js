import request from "@/util/request";

// 查询所有
export function selectAllUnitsInfo(pageNum, pageSize) {
  return request({
    method: "get",
    url: "/admin/units",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
}

// 根据教师编号搜索
export function searchUnitsByTeacherId(id) {
  return request({
    method: "post",
    url: "/admin/searchUnitsByTeacherId",
    params: {
      teachersId: id,
    },
  });
}

// 根据教师名称搜索
export function searchUnitsByName(name) {
  return request({
    method: "post",
    url: "/admin/searchUnitsByName",
    params: {
      name: name,
    },
  });
}

// 删除
export function deleteUnitsById(id) {
  return request({
    method: "post",
    url: "/admin/deleteUnitsById",
    params: {
      id: id,
    },
  });
}

// 增加
export function insertUnits(data) {
  return request({
    method: "post",
    url: "/admin/insertUnits",
    data: data,
  });
}

// 修改
export function updateUnits(data) {
  return request({
    method: "post",
    url: "/admin/updateUnits",
    data: data,
  });
}
