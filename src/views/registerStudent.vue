<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/registerStudent' }"
        >注册学生</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <div class="box">
    <div class="left">
      <h1 style="margin: 0 0 20px 0">注册学生</h1>

      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        status-icon
        class="demo-form"
        label-position="left"
        label-width="80px"
        require-asterisk-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" clearable />
        </el-form-item>
        <el-form-item label="学生编号" prop="studentID">
          <el-input v-model.number="form.studentID" clearable />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" clearable />
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model.number="form.phoneNumber" clearable />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" clearable />
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" clearable />
        </el-form-item>
        <el-form-item label="所属院系" prop="department">
          <el-input v-model="form.department" clearable />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handInsertForm()"
            style="width: 100%"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerStudents } from "@/api/register";
import { handleErrorResponse } from "@/util/request";
import { getToken, removeToken } from "@/util/auth";
export default {
  name: "registerStudent",
  data() {
    return {
      form: {},
      rules: {
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        studentID: {
          required: true,
          message: "请输入学生编号数",
          trigger: "blur",
          pattern: /^([0-9])+$/,
        },
        name: {
          required: true,
          message: "请输入学生名称",
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
        nickName: {
          required: false,
          trigger: "blur",
          message: "请输入昵称",
        },
        gender: {
          required: true,
          trigger: "blur",
          message: "请输入性别（男或女）",
          pattern: /^男$|^女$/,
        },
        age: {
          required: false,
          message: "请输入年龄",
          trigger: "blur",
          pattern: /^([1-9])?([0-9])+$/,
        },
        department: {
          required: true,
          message: "请输入学生所属院系",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    // 注册学生
    handInsertForm() {
      this.$refs["form"].validate((validate) => {
        if (validate) {
          const data = this.form;
          registerStudents(data)
            .then((response) => {
              console.log(response);
              if (response.code === 200) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
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
            })
            .catch((error) => {
              console.log(error);
            });
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
  justify-content: center;
  align-items: center;
}
.left {
  border: 1px solid#000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin-top: 50px;
  border-radius: 10px;
}
.el-form {
  width: 500px;
}
.el-form input {
  width: 300px;
}
</style>
