<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/allUser' }"
        >所有用户</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <div class="box">
    <div class="up">
      <h1 class="title">所有用户信息</h1>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" type="index" label="ID" width="120" />
      <el-table-column
        prop="userType"
        label="用户类别"
        width="auto"
        sortable=""
      >
        <template #default="scoped">
          {{ scoped.row.userType == 0 ? "教师" : "学生" }}
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="auto" />
      <el-table-column prop="username" label="用户名" width="auto" />
      <el-table-column prop="sex" label="性别" width="auto" />
      <el-table-column prop="email" label="邮箱" width="auto" />
      <el-table-column prop="phoneNumber" label="电话" width="auto" />
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

    <el-dialog title="修改" v-model="dialogVisible" width="30%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" style="width: 80%"></el-input>
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
import { selectAllUserInfo, deleteUserById, updateUser } from "@/api/user";
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
      dialogVisible: false,
      form: {},
      rules: {
        nickName: {
          required: true,
          message: "请输入昵称",
          trigger: "blur",
        },
        gender: {
          required: true,
          message: "请输入性别",
          trigger: "blur",
        },
        email: {
          required: false,
          trigger: "blur",
          message: "请输入邮箱",
          pattern: /^([1-9])?([0-9])+@([a-zA-Z0-9]+).([a-zA-Z])+$/,
        },
        phoneNumber: {
          required: true,
          trigger: "blur",
          message: "请输入电话",
          pattern: /^([1-9])?([0-9]){11}$/,
        },
      },
    };
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    // 查询所有学生信息
    selectAll() {
      const token = getToken();
      if (token !== null) {
        const pageNum = this.currentPage;
        const pageSize = this.pageSize;
        selectAllUserInfo(pageNum, pageSize).then((response) => {
          //   console.log(response);
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
        });
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
    // 删除
    handDelete(id) {
      //   console.log(id);
      deleteUserById(id).then((response) => {
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
      });
    },
    // 修改弹窗
    handUpdate(row) {
      this.dialogVisible = true;
      this.form = row;
      this.form.gender = row.sex;
      // 清空上次校验信息
      // 判断 form 表单中有没有需要重置的内容如果有则重置
      if (this.$refs["form"] != undefined) {
        this.$refs["form"].resetFields();
      }
    },
    save() {
      if (this.form.id) {
        updateUser(this.form).then((res) => {
          if (res.code == 200) {
            this.selectAll();
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
        });
        console.log(this.form);
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
