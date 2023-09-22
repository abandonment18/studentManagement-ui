<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/updatePassword' }"
        >修改密码</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <div class="box">
    <div class="left">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        status-icon
        class="demo-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" readonly />
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" clearable />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" clearable />
        </el-form-item>
        <el-form-item label="再次输入密码" prop="repeatPassword">
          <el-input v-model="form.repeatPassword" type="password" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handUpdateForm()">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <h1>修改密码</h1>
    </div>
  </div>
</template>

<script>
import { updatePassword } from "@/api/changePassword";
import { selectPerson } from "@/api/personalInfo";
import { handleErrorResponse } from "@/util/request";
import { getToken, removeToken } from "@/util/auth";
export default {
  name: "registerStudent",
  data() {
    return {
      form: {
        username: "",
      },
      rules: {
        oldPassword: {
          required: true,
          message: "请输入原密码",
          trigger: "blur",
          pattern: /^([0-9])+$/,
        },
        password: {
          required: true,
          message: "请输入新密码",
          trigger: "blur",
        },
        repeatPassword: {
          required: true,
          message: "请再次输入新密码",
          trigger: "blur",
        },
      },
    };
  },
  mounted() {
    // 查询个人信息
    selectPerson().then((response) => {
      this.form.username = response.data.userName;
    });
  },
  methods: {
    // 修改个人信息
    handUpdateForm() {
      this.$refs["form"].validate((validate) => {
        if (validate) {
          if (this.form.password === this.form.repeatPassword) {
            const data = this.form;
            updatePassword(data).then((response) => {
              // console.log(response);
              if (response.code === 200) {
                this.$message({
                  type: "success",
                  message: "修改成功，请重新登录",
                });
                removeToken(getToken);
                this.$router.push("/");
                this.form = {};
                if (this.$refs["form"] != undefined) {
                  this.$refs["form"].resetFields();
                }
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
              } else {
                handleErrorResponse(response.code);
              }
            });
          } else {
            this.$message({
              type: "error",
              message: "两次密码不同",
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "验证失败，请检查后重新提交",
          });
        }
        return false;
      });
    },
  },
};
</script>

<style scoped>
.crumbs {
  margin-bottom: 20px;
}
.box {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left {
  width: 300px;
}
</style>
