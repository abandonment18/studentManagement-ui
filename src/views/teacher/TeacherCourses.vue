<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>教师信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/teachercourses' }"
        >教师授课</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <div class="box">
    <div class="up">
      <h1 class="title">所有教师授课信息</h1>
      <el-input
        v-model="searchTeacherCourseTeacherId"
        placeholder="请输入教师编号"
        clearable
        size="large"
        style="width: 450px; margin: 0 20px 10px 0"
      />

      <el-button
        type="primary"
        @click="handSearchByTeacherId"
        style="margin: 0 155px 0 0"
        >搜索</el-button
      >
      <el-input
        v-model="searchTeacherCourseCourseName"
        placeholder="请输入课程姓名"
        clearable
        size="large"
        style="width: 450px; margin: 0 20px 10px 0"
      />
      <el-button
        type="primary"
        @click="handSearchByByCourseName"
        style="margin: 0 7px 0 0"
        >搜索</el-button
      >
      <el-input
        v-model="searchTeacherCourseTeacherName"
        placeholder="请输入教师姓名"
        clearable
        size="large"
        style="width: 450px; margin: 0 20px 0 0"
      />
      <el-button type="primary" @click="handSearchByByTeacherName"
        >搜索</el-button
      >
      <el-button type="primary" @click="handReset">重置</el-button>
      <el-button type="primary" @click="handAdd">新增</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" type="index" label="ID" width="120" />
      <el-table-column
        prop="teacherID"
        label="教师编号"
        width="auto"
        sortable=""
      />
      <el-table-column prop="teacherName" label="教师名称" width="auto" />
      <el-table-column prop="courseID" label="课程编号" width="auto" />
      <el-table-column prop="courseName" label="课程名称" width="auto" />
      <el-table-column prop="courseCredit" label="所修学分" width="auto" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scoped">
          <el-button
            link
            type="danger"
            size="small"
            @click="handDelete(scoped.row.id)"
            >删除</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handUpdate(scoped.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改或新增" v-model="dialogVisible" width="30%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="教师编号" prop="teacherID">
          <el-input v-model="form.teacherID" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="教师名称" prop="teacherName">
          <el-input v-model="form.teacherName" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="课程编号" prop="courseID">
          <el-input v-model="form.courseID" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="form.courseName" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="所修学分" prop="courseCredit">
          <el-input v-model="form.courseCredit" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!--    添加分页导航-->
    <div class="pageInfo" style="margin: 40px 0">
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  selectAllTeacherCourseInfo,
  searchTeacherCourseByTeachersId,
  searchTeacherCourseByCourseName,
  searchTeacherCourseByTeacherName,
  deleteTeacherCourseById,
  insertTeacherCourse,
  updateTeacherCourse,
} from "@/api/teacher/TeacherCourse";
import { handleErrorResponse } from "@/util/request";
import { getToken, removeToken } from "@/util/auth";

export default {
  name: "courses",
  data() {
    return {
      // 增加分页相应的数据绑定
      // 当前页
      currentPage: 1,
      // 每页显示记录数
      pageSize: 10,

      // 共有多少记录
      total: 10,
      tableData: [],
      // 搜索输入的值
      searchTeacherCourseTeacherId: "",
      searchTeacherCourseTeacherName: "",
      searchTeacherCourseCourseName: "",
      dialogVisible: false,
      form: {},
      rules: {
        teacherID: {
          required: true,
          message: "请输入教师编号数",
          trigger: "blur",
          pattern: /^([0-9])+$/,
        },
        teacherName: {
          required: true,
          message: "请输入教师名称",
          trigger: "blur",
        },
        courseID: {
          required: true,
          message: "请输入课程编号",
          trigger: "blur",
          pattern: /^([0-9])+$/,
        },
        courseName: {
          required: true,
          message: "请输入课程名称",
          trigger: "blur",
        },
        courseCredit: {
          required: true,
          message: "请输入课程所修学分",
          trigger: "blur",
          pattern: /^([0-9])$/,
        },
      },
    };
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    // 查询所有教师授课
    selectAll() {
      const token = getToken();
      if (token !== null) {
        const pageNum = this.currentPage;
        const pageSize = this.pageSize;
        selectAllTeacherCourseInfo(pageNum, pageSize)
          .then((response) => {
            // console.log(response);
            if (response.code === 200) {
              this.tableData = response.data.list;
              this.total = response.data.total;
            } else if (response.code === 401) {
              handleErrorResponse(response.code);
              removeToken(getToken);
              this.$router.push("/");
              this.$message({
                type: "error",
                message: "请重新登录",
              });
            } else {
              handleErrorResponse(response.code);
            }
          })
          .catch(() => {});
      } else {
        removeToken(getToken);
        this.$router.push("/");
        this.$message({
          type: "error",
          message: "请登录",
        });
      }
    },
    // 处理分页请求
    handleCurrentChange(pageNum) {
      // 当用户点击分页超链接时，会携带 pageNum
      // console.log(pageNum)
      // 此处的 pageNum 是后端传来的数据
      this.currentPage = pageNum;
      // 发出请求
      this.selectAll();
    },
    handlePageSizeChange(pageSize) {
      //   console.log( pageSize);
      // 此处的 pageSize 是后端传来的数据
      this.pageSize = pageSize;

      this.selectAll();
    },
    // 根据教师编号（TeacherId）搜索
    handSearchByTeacherId() {
      //   console.log(this.search);
      const data = this.searchTeacherCourseTeacherId;
      if (data) {
        searchTeacherCourseByTeachersId(data)
          .then((response) => {
            if (response.code == 200) {
              this.tableData = response.data;
            } else if (response.code === 401) {
              handleErrorResponse(response.code);
              removeToken(getToken);
              this.$router.push("/");
              this.$message({
                type: "error",
                message: "请重新登录",
              });
            } else {
              handleErrorResponse(response.code);
            }
          })
          .catch(() => {});
      } else {
        return false;
      }
    },
    // 根据教师名称查询
    handSearchByByTeacherName() {
      const data = this.searchTeacherCourseTeacherName;
      // console.log(data);
      if (data) {
        searchTeacherCourseByTeacherName(data)
          .then((response) => {
            if (response.code == 200) {
              this.tableData = response.data;
            } else if (response.code === 401) {
              handleErrorResponse(response.code);
              removeToken(getToken);
              this.$router.push("/");
              this.$message({
                type: "error",
                message: "请重新登录",
              });
            } else {
              handleErrorResponse(response.code);
            }
          })
          .catch(() => {});
      } else {
        return false;
      }
    },
    // 根据课程名称搜索
    handSearchByByCourseName() {
      const data = this.searchTeacherCourseCourseName;
      // console.log(data);
      if (data) {
        searchTeacherCourseByCourseName(data)
          .then((response) => {
            if (response.code == 200) {
              this.tableData = response.data;
            } else if (response.code === 401) {
              handleErrorResponse(response.code);
              removeToken(getToken);
              this.$router.push("/");
              this.$message({
                type: "error",
                message: "请重新登录",
              });
            } else {
              handleErrorResponse(response.code);
            }
          })
          .catch(() => {});
      } else {
        return false;
      }
    },
    // 重置按钮
    handReset() {
      this.selectAll();
      this.searchTeacherCourseTeacherId = "";
      this.searchTeacherCourseTeacherName = "";
      this.searchTeacherCourseCourseName = "";
    },
    // 删除
    handDelete(id) {
      //   console.log(id);
      deleteTeacherCourseById(id)
        .then((response) => {
          if (response.code == 200) {
            this.selectAll();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          } else if (response.code === 401) {
            handleErrorResponse(response.code);
            removeToken(getToken);
            this.$router.push("/");
            this.$message({
              type: "error",
              message: "请重新登录",
            });
          } else {
            handleErrorResponse(response.code);
          }
        })
        .catch(() => {});
    },
    // 增加弹窗
    handAdd() {
      this.dialogVisible = true;
      // 清除添加表单数据
      this.form = {};
      // 清空上次校验信息
      // 判断 form 表单中有没有需要重置的内容如果有则重置
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
    },
    // 增加和修改
    save() {
      // 如果为 true 则为增加，反正则为修改
      //   console.log(Boolean(this.form.id) + this.form.id);
      if (this.form.id) {
        // const data = this.form;
        this.$refs["form"].validate((validate) => {
          // 让前端校验放行，测试完毕后，在修改回去
          // console.log(validate);
          //   validate = true;
          // validate 就是表单校验后返回的结果
          if (validate) {
            const data = this.form;
            updateTeacherCourse(data)
              .then((response) => {
                if (response.code == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功",
                  });
                  this.selectAll();
                  this.dialogVisible = false;
                } else if (response.code === 300) {
                  this.$message({
                    type: "error",
                    message: response.msg,
                  });
                } else if (response.code === 401) {
                  handleErrorResponse(response.code);
                  removeToken(getToken);
                  this.$router.push("/");
                  this.$message({
                    type: "error",
                    message: "请重新登录",
                  });
                } else if (response.code === 403) {
                  handleErrorResponse(response.code);
                  this.dialogVisible = false;
                } else {
                  handleErrorResponse(response.code);
                }
              })
              .catch(() => {});
          } else {
            // 校验没有通过
            // 提示 校验失败 消息框
            this.$message({
              type: "error",
              message: "验证失败，不提交",
            });
          }
          // 放弃提交
          return false;
        });
      } else {
        this.$refs["form"].validate((validate) => {
          // 让前端校验放行，测试完毕后，在修改回去
          // console.log(validate);
          //   validate = true;
          // validate 就是表单校验后返回的结果
          if (validate) {
            insertTeacherCourse(this.form)
              .then((response) => {
                if (response.code == 200) {
                  this.$message({
                    type: "success",
                    message: "增加成功",
                  });
                  this.selectAll();
                  this.dialogVisible = false;
                } else if (response.code === 300) {
                  this.$message({
                    type: "error",
                    message: response.msg,
                  });
                } else if (response.code === 401) {
                  handleErrorResponse(response.code);
                  removeToken(getToken);
                  this.$router.push("/");
                  this.$message({
                    type: "error",
                    message: "请重新登录",
                  });
                } else if (response.code === 403) {
                  handleErrorResponse(response.code);
                  this.dialogVisible = false;
                } else {
                  handleErrorResponse(response.code);
                }
              })
              .catch(() => {});
          } else {
            // 校验没有通过
            // 提示 校验失败 消息框
            this.$message({
              type: "error",
              message: "验证失败，不提交",
            });
          }
          // 放弃提交
          return false;
        });
      }
    },
    // 修改弹窗
    handUpdate(row) {
      // JSON.stringify(row) 将 row 传为 json 字符串
      // JSON.parse(JSON.stringify(row)) 将 json 字符串转为 json 对象
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      if (this.$refs["form"] != undefined) {
        this.$refs["form"].resetFields();
      }
    },
  },
};
</script>

<style scoped>
.crumbs {
  margin-bottom: 20px;
}
.pageInfo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.up {
  margin: 0 0 20px 0;
}
.title {
  display: block;
  float: right;
  margin: 0 40px 0 0;
}
</style>
