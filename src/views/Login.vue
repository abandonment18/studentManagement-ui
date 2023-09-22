<template>
  <div class="box">
    <el-form
      style="max-width: 460px"
      :model="login"
      ref="login"
      @keydown.enter="loginForm"
      :rules="loginRules"
    >
      <h1 style="text-align: center; margin-bottom: 30px">登录</h1>

      <el-form-item label="Username" prop="username" class="item">
        <el-input v-model="login.username" type="text" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="login.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="loginForm"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/api/login";
import { setToken } from "@/util/auth";
import { handleErrorResponse } from "@/util/request";

export default {
  name: "login",
  data() {
    return {
      // 登录数据初始化
      login: {
        // username: "",
        // password: "",
      },
      // input 的宽度
      formLabelWidth: "100px",
      // 注册数据初始化
      // 登录校验
      loginRules: {
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // canSubmit() {
    //   const { username, passowrd } = this.login;
    //   return Boolean(username && passowrd);
    // },
    // 处理异常
    // handleErrorResponse(status) {
    //   const errorMessage = errorCode[status] || errorCode.default;
    //   this.$message({
    //     type: "error",
    //     message: errorMessage,
    //   });
    //   // console.log(errorMessage);
    // },

    // 登录
    loginForm() {
      const data = this.login;
      this.$refs["login"].validate((validate) => {
        if (validate) {
          login(data).then((response) => {
            // console.log(response);
            if (response.code === 200) {
              this.$router.push("/admin/home");
              setToken(response.data.token);
              this.$message({
                type: "success",
                message: "登陆成功",
              });
            }
            // 401: "认证失败，无法访问系统资源",
            else if (response.code === 401) {
              handleErrorResponse(response.code);
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "验证失败",
          });
        }
        return false;
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: 100%;
}
.el-form {
  margin: auto;
  width: 400px;
}
.el-form-item__label::before {
  display: none;
}
</style>
